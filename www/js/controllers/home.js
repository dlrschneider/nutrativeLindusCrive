app.controller('HomeController', function ($scope, $http, $ionicModal, $localStorage, infoLogin, selectDB, insertDB, $state, tipoListaRegistroAlimento, infoLogin) {

    $scope.$state = $state;
    $scope.noticias = selectDB.noticia();
    $scope.qtdNoticias = 2;

    $scope.carregaMaisNoticias = function () {
        if ($scope.noticias.length > $scope.qtdNoticias) {
            $scope.qtdNoticias += 3;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.addAlimentoTp1 = function () {
        $state.go('menu.listaAlimentos');
        tipoListaRegistroAlimento.setTipo(1);
    }

    $scope.peso = $localStorage.peso;
    $scope.altura = $localStorage.altura;
    $scope.sexo = $localStorage.sexo;
    $scope.idade = $localStorage.idade;
    $scope.fatorDeAtividade = $localStorage.fatorDeAtividade;

    $scope.imc = $scope.peso / ($localStorage.altura * $localStorage.altura);
    $scope.imc = $scope.imc.toFixed(2);
    if ($scope.imc < 17) {
        $scope.msgImc = "Muito abaixo do peso";
    } else if ($scope.imc < 18.5) {
        $scope.msgImc = "Abaixo do peso";
    } else if ($scope.imc < 25) {
        $scope.msgImc = "Peso normal";
    } else if ($scope.imc < 30) {
        $scope.msgImc = "Acima do peso";
    } else if ($scope.imc < 35) {
        $scope.msgImc = "Obesidade I";
    } else if ($scope.imc < 40) {
        $scope.msgImc = "Obesidade II (severa)";
    } else {
        $scope.msgImc = "Obesidade III (mórbida)";
    }

    if ($scope.sexo === "H") {
        $scope.tmb = 66 + (13.7 * $scope.peso) + (5 * ($scope.altura * 100)) - (6.8 * $scope.idade);
    } else {
        $scope.tmb = 655 + (9.6 * $scope.peso) + (1.8 * ($scope.altura * 100)) - (4.7 * $scope.idade);
    }
    $scope.tmb = $scope.tmb.toFixed(2);

    $scope.calManterPeso = $scope.tmb * $scope.fatorDeAtividade;
    $scope.calManterPeso = $scope.calManterPeso.toFixed(2);
    $scope.calEmagrecer = ($scope.tmb * $scope.fatorDeAtividade) * 0.8;
    $scope.calEmagrecer = $scope.calEmagrecer.toFixed(2);
    $scope.calEngordar = ($scope.tmb * $scope.fatorDeAtividade) * 1.15;
    $scope.calEngordar = $scope.calEngordar.toFixed(2);

    buscaAlimentos = function () {

        $http.post('http://localhost/nutrative/index.php/ws/site2app/alimentos/').then(function (resp) {
            for (var i = 0; i < resp.data.length; i++) {

                var alimentos = [];

                var dataCadastro = new Date(resp.data[i]["dataCadastro"]);

                alimentos.push(resp.data[i]["idAlimento"]);
                alimentos.push(resp.data[i]["nome"]);
                alimentos.push(resp.data[i]["carboidrato"]);
                alimentos.push(resp.data[i]["proteina"]);
                alimentos.push(resp.data[i]["lipidio"]);
                alimentos.push(resp.data[i]["ativo"] === 'S' ? 1 : 0);
                alimentos.push(dataCadastro.getTime());

                insertDB.alimento(alimentos);
            }

        });

    }

    buscaDietas = function () {

        $http.post('http://localhost/nutrative/index.php/ws/site2app/dietas/' + infoLogin.getIdNutricionista()).then(function (resp) {

            for (var i = 0; i < resp.data.length; i++) {

                var dieta = [];

                var dataCadastro = new Date(resp.data[i]["dataCadastro"]);

                dieta.push(resp.data[i]["idDieta"]);
                dieta.push(resp.data[i]["nutricionista"]["idNutricionista"]);
                dieta.push(resp.data[i]["nome"]);
                dieta.push(resp.data[i]["ativo"]);
                dieta.push(dataCadastro.getTime());

                insertDB.dieta(dieta);
            }
        });
    }

    buscaHistoricoDietas = function () {
        $http.post('http://localhost/nutrative/index.php/ws/site2app/dietashistorico/' + infoLogin.getIdCliente()).then(function (resp) {

            for (var i = 0; i < resp.data.length; i++) {
                var dietaHistorico = [];

                var dataCadastro = new Date(resp.data[i]["dataCadastro"]);

                dietaHistorico.push(resp.data[i]["idDietaHistorico"]);
                dietaHistorico.push(resp.data[i]["dieta"]["idDieta"]);
                dietaHistorico.push(resp.data[i]["cliente"]["idCliente"]);
                dietaHistorico.push(dataCadastro.getTime());

                insertDB.dietaHistorico(dietaHistorico);
            }
        });
    }

    buscaHistoricoAlimentacao = function () {
        $http.post('http://localhost/nutrative/index.php/ws/site2app/historicoAlimentacao/' + infoLogin.getIdCliente()).then(function (resp) {

            for (var i = 0; i < resp.data.length; i++) {

                var dietaHistoricoAlimentacao = [];

                var dataCadastro = new Date(resp.data[i]["dataCadastro"]);

                dietaHistoricoAlimentacao.push(parseInt(resp.data[i]["dietaHistorico"]["idDietaHistorico"]));
                dietaHistoricoAlimentacao.push(resp.data[i]["alimento"]);
                dietaHistoricoAlimentacao.push(dataCadastro.getTime());

                insertDB.dietaHistoricoAlimentacao(dietaHistoricoAlimentacao);
            }
        });
    }

    buscaNoticias = function () {

        $http.post('http://localhost/nutrative/index.php/ws/site2app/noticias/' + infoLogin.getIdNutricionista()).then(function (resp) {

            for (var i = 0; i < resp.data.length; i++) {

                var noticia = [];

                var dataCadastro = new Date(resp.data[i]["dataCadastro"]);

                noticia.push(parseInt(resp.data[i]["idNoticia"]));
                noticia.push(resp.data[i]["nutricionista"]["idNutricionista"]);
                noticia.push(resp.data[i]["nutricionista"]["nome"]);
                noticia.push(resp.data[i]["titulo"]);
                noticia.push(resp.data[i]["descricao"]);
                noticia.push(dataCadastro.getTime());

                insertDB.noticia(noticia);
            }
        });
    }

    buscaDietaAlimentos = function () {

        $http.post('http://localhost/nutrative/index.php/ws/site2app/dietasAlimentos/' + infoLogin.getIdNutricionista()).then(function (resp) {

            for (var i = 0; i < resp.data.length; i++) {

                var dietaAlimento = [];

                dietaAlimento.push(parseInt(resp.data[i]["idDietaAlimento"]));
                dietaAlimento.push(resp.data[i]["dieta"]["idDieta"]);
                dietaAlimento.push(resp.data[i]["alimento"]["idAlimento"]);
                dietaAlimento.push(resp.data[i]["turno"]);

                insertDB.dietaAlimento(dietaAlimento);

            }

       });
    }

    buscaAlimentos();
    buscaDietas();
    buscaHistoricoDietas();
    buscaHistoricoAlimentacao();
    buscaNoticias();
    buscaDietaAlimentos();
});