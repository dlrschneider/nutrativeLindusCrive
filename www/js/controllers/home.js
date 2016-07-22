app.controller('HomeController', function ($scope, $http, $ionicModal, $localStorage, infoLogin, selectDB, insertDB, $state) {

    $scope.$state = $state;
    $scope.noticias = selectDB.noticia();
    $scope.qtdNoticias = 2;

    $scope.carregaMaisNoticias = function () {
        if ($scope.noticias.length > $scope.qtdNoticias) {
            $scope.qtdNoticias += 3;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

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

        var resp = [{
            "idAlimento": "1",
            "nome": "Frango, caipira, com pele, cozido",
            "carboidrato": "0.00",
            "proteina": "23.90",
            "lipidio": "15.60",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:54:29"
        }, {
            "idAlimento": "2",
            "nome": "Frango, caipira, sem pele, cozido",
            "carboidrato": "0.00",
            "proteina": "29.90",
            "lipidio": "7.70",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:54:29"
        }, {
            "idAlimento": "3",
            "nome": null,
            "carboidrato": "0.00",
            "proteina": "17.00",
            "lipidio": "3.50",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:54:29"
        }, {
            "idAlimento": "4",
            "nome": null,
            "carboidrato": "13.30",
            "proteina": "13.20",
            "lipidio": "12.40",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:54:29"
        }, {
            "idAlimento": "5",
            "nome": null,
            "carboidrato": "0.00",
            "proteina": "17.00",
            "lipidio": "3.50",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:54:29"
        }, {
            "idAlimento": "6",
            "nome": null,
            "carboidrato": "11.00",
            "proteina": "23.20",
            "lipidio": "7.50",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:54:29"
        }, {
            "idAlimento": "7",
            "nome": "Tomate cozido",
            "carboidrato": "0.00",
            "proteina": "23.90",
            "lipidio": "15.60",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:56:14"
        }, {
            "idAlimento": "8",
            "nome": "Laranja",
            "carboidrato": "0.00",
            "proteina": "29.90",
            "lipidio": "7.70",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:56:14"
        }, {
            "idAlimento": "9",
            "nome": "Banana caipira",
            "carboidrato": "0.00",
            "proteina": "17.00",
            "lipidio": "3.50",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:56:14"
        }, {
            "idAlimento": "10",
            "nome": "Gelatina light",
            "carboidrato": "13.30",
            "proteina": "13.20",
            "lipidio": "12.40",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:56:14"
        }, {
            "idAlimento": "11",
            "nome": "Barra de sereal",
            "carboidrato": "0.00",
            "proteina": "17.00",
            "lipidio": "3.50",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:56:14"
        }, {
            "idAlimento": "12",
            "nome": "Leite",
            "carboidrato": "11.00",
            "proteina": "23.20",
            "lipidio": "7.50",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:56:14"
        }, {
            "idAlimento": "13",
            "nome": "Azeitona",
            "carboidrato": "0.00",
            "proteina": "23.90",
            "lipidio": "15.60",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:57:50"
        }, {
            "idAlimento": "14",
            "nome": "Morango",
            "carboidrato": "0.00",
            "proteina": "29.90",
            "lipidio": "7.70",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:57:51"
        }, {
            "idAlimento": "15",
            "nome": "Nozes",
            "carboidrato": "0.00",
            "proteina": "17.00",
            "lipidio": "3.50",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:57:51"
        }, {
            "idAlimento": "16",
            "nome": null,
            "carboidrato": "13.30",
            "proteina": "13.20",
            "lipidio": "12.40",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:57:51"
        }, {
            "idAlimento": "17",
            "nome": "queijo ricota",
            "carboidrato": "0.00",
            "proteina": "17.00",
            "lipidio": "3.50",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:57:51"
        }, {
            "idAlimento": "18",
            "nome": "presunto",
            "carboidrato": "11.00",
            "proteina": "23.20",
            "lipidio": "7.50",
            "ativo": null,
            "dataCadastro": "2016-06-01 19:57:51"
        }];

        for (var i = 0; i < resp.length; i++) {

            var alimentos = [];

            var dataCadastro = new Date(resp[i]["dataCadastro"]);

            alimentos.push(resp[i]["idAlimento"]);
            alimentos.push(resp[i]["nome"]);
            alimentos.push(resp[i]["carboidrato"]);
            alimentos.push(resp[i]["proteina"]);
            alimentos.push(resp[i]["lipidio"]);
            alimentos.push(resp[i]["ativo"] === 'S' ? 1 : 0);
            alimentos.push(dataCadastro.getTime());

            insertDB.alimento(alimentos);
        }

    }

    buscaDietas = function () {

        var resp = [{
            "idDieta": "1",
            "nutricionista": {
                "idNutricionista": 1,
                "nome": null,
                "cnpj": null,
                "email": null,
                "estado": null,
                "cidade": null,
                "bairro": null,
                "complemento": null,
                "ativo": null,
                "login": null,
                "senha": null,
                "dataCadastro": null
            },
            "nome": null,
            "ativo": "S",
            "dataCadastro": "2016-06-01 20:12:52",
            "dietasAlimentos": null,
            "htmlAlimentosVinculados": null
        }, {
            "idDieta": "3",
            "nutricionista": {
                "idNutricionista": 1,
                "nome": null,
                "cnpj": null,
                "email": null,
                "estado": null,
                "cidade": null,
                "bairro": null,
                "complemento": null,
                "ativo": null,
                "login": null,
                "senha": null,
                "dataCadastro": null
            },
            "nome": "Dieta Thiago Moura",
            "ativo": "S",
            "dataCadastro": "2016-06-02 04:32:39",
            "dietasAlimentos": null,
            "htmlAlimentosVinculados": null
        }, {
            "idDieta": "4",
            "nutricionista": {
                "idNutricionista": 1,
                "nome": null,
                "cnpj": null,
                "email": null,
                "estado": null,
                "cidade": null,
                "bairro": null,
                "complemento": null,
                "ativo": null,
                "login": null,
                "senha": null,
                "dataCadastro": null
            },
            "nome": "Daniel 2016",
            "ativo": "S",
            "dataCadastro": "2016-06-02 23:20:46",
            "dietasAlimentos": null,
            "htmlAlimentosVinculados": null
        }, {
            "idDieta": "5",
            "nutricionista": {
                "idNutricionista": 1,
                "nome": null,
                "cnpj": null,
                "email": null,
                "estado": null,
                "cidade": null,
                "bairro": null,
                "complemento": null,
                "ativo": null,
                "login": null,
                "senha": null,
                "dataCadastro": null
            },
            "nome": "Evar 2016",
            "ativo": "S",
            "dataCadastro": "2016-06-09 23:45:15",
            "dietasAlimentos": null,
            "htmlAlimentosVinculados": null
        }];

        for (var i = 0; i < resp.length; i++) {
            
            var dieta = [];
            
            var dataCadastro = new Date(resp[i]["dataCadastro"]);
            
            dieta.push(resp[i]["idDieta"]);
            dieta.push(resp[i]["nutricionista"]["idNutricionista"]);
            dieta.push(resp[i]["nome"]);
            dieta.push(resp[i]["ativo"]);
            dieta.push(dataCadastro.getTime());
            
            insertDB.dieta(dieta);
        }

    }

    buscaHistoricoDietas = function () {

        var resp = [{
            "idDietaHistorico": "6",
            "dieta": {
                "idDieta": "1",
                "nutricionista": null,
                "nome": null,
                "ativo": null,
                "dataCadastro": null,
                "dietasAlimentos": null,
                "htmlAlimentosVinculados": null
            },
            "cliente": {
                "idCliente": "1",
                "idNutricionista": null,
                "nome": null,
                "altura": null,
                "peso": null,
                "login": null,
                "senha": null,
                "ativo": null,
                "dataNascimento": null,
                "dataCadastro": null,
                "htmlPainelDieta": null
            },
            "dataCadastro": "2016-06-02 20:25:57"
        }, {
            "idDietaHistorico": "7",
            "dieta": {
                "idDieta": "1",
                "nutricionista": null,
                "nome": null,
                "ativo": null,
                "dataCadastro": null,
                "dietasAlimentos": null,
                "htmlAlimentosVinculados": null
            },
            "cliente": {
                "idCliente": "1",
                "idNutricionista": null,
                "nome": null,
                "altura": null,
                "peso": null,
                "login": null,
                "senha": null,
                "ativo": null,
                "dataNascimento": null,
                "dataCadastro": null,
                "htmlPainelDieta": null
            },
            "dataCadastro": "2016-06-02 20:26:26"
        }, {
            "idDietaHistorico": "8",
            "dieta": {
                "idDieta": "1",
                "nutricionista": null,
                "nome": null,
                "ativo": null,
                "dataCadastro": null,
                "dietasAlimentos": null,
                "htmlAlimentosVinculados": null
            },
            "cliente": {
                "idCliente": "1",
                "idNutricionista": null,
                "nome": null,
                "altura": null,
                "peso": null,
                "login": null,
                "senha": null,
                "ativo": null,
                "dataNascimento": null,
                "dataCadastro": null,
                "htmlPainelDieta": null
            },
            "dataCadastro": "2016-06-02 20:28:11"
        }, {
            "idDietaHistorico": "9",
            "dieta": {
                "idDieta": "3",
                "nutricionista": null,
                "nome": null,
                "ativo": null,
                "dataCadastro": null,
                "dietasAlimentos": null,
                "htmlAlimentosVinculados": null
            },
            "cliente": {
                "idCliente": "1",
                "idNutricionista": null,
                "nome": null,
                "altura": null,
                "peso": null,
                "login": null,
                "senha": null,
                "ativo": null,
                "dataNascimento": null,
                "dataCadastro": null,
                "htmlPainelDieta": null
            },
            "dataCadastro": "2016-06-02 20:28:11"
        }, {
            "idDietaHistorico": "10",
            "dieta": {
                "idDieta": "3",
                "nutricionista": null,
                "nome": null,
                "ativo": null,
                "dataCadastro": null,
                "dietasAlimentos": null,
                "htmlAlimentosVinculados": null
            },
            "cliente": {
                "idCliente": "1",
                "idNutricionista": null,
                "nome": null,
                "altura": null,
                "peso": null,
                "login": null,
                "senha": null,
                "ativo": null,
                "dataNascimento": null,
                "dataCadastro": null,
                "htmlPainelDieta": null
            },
            "dataCadastro": "2016-06-02 20:28:19"
        }, {
            "idDietaHistorico": "11",
            "dieta": {
                "idDieta": "1",
                "nutricionista": null,
                "nome": null,
                "ativo": null,
                "dataCadastro": null,
                "dietasAlimentos": null,
                "htmlAlimentosVinculados": null
            },
            "cliente": {
                "idCliente": "1",
                "idNutricionista": null,
                "nome": null,
                "altura": null,
                "peso": null,
                "login": null,
                "senha": null,
                "ativo": null,
                "dataNascimento": null,
                "dataCadastro": null,
                "htmlPainelDieta": null
            },
            "dataCadastro": "2016-06-02 20:28:26"
        }, {
            "idDietaHistorico": "12",
            "dieta": {
                "idDieta": "3",
                "nutricionista": null,
                "nome": null,
                "ativo": null,
                "dataCadastro": null,
                "dietasAlimentos": null,
                "htmlAlimentosVinculados": null
            },
            "cliente": {
                "idCliente": "1",
                "idNutricionista": null,
                "nome": null,
                "altura": null,
                "peso": null,
                "login": null,
                "senha": null,
                "ativo": null,
                "dataNascimento": null,
                "dataCadastro": null,
                "htmlPainelDieta": null
            },
            "dataCadastro": "2016-06-02 21:03:50"
        }, {
            "idDietaHistorico": "13",
            "dieta": {
                "idDieta": "3",
                "nutricionista": null,
                "nome": null,
                "ativo": null,
                "dataCadastro": null,
                "dietasAlimentos": null,
                "htmlAlimentosVinculados": null
            },
            "cliente": {
                "idCliente": "1",
                "idNutricionista": null,
                "nome": null,
                "altura": null,
                "peso": null,
                "login": null,
                "senha": null,
                "ativo": null,
                "dataNascimento": null,
                "dataCadastro": null,
                "htmlPainelDieta": null
            },
            "dataCadastro": "2016-06-02 21:04:15"
        }];
        
        $http.post('localhost/nutrative/index.php/ws/site2app/dietas/1').then(function (resp) {
            console.log(resp.data);
        });

        for (var i = 0; i < resp.length; i++) {
            
            var dietaHistorico = [];
            
            var dataCadastro = new Date(resp[i]["dataCadastro"]);
            
            dietaHistorico.push(resp[i]["idDietaHistorico"]);
            dietaHistorico.push(resp[i]["dieta"]["idDieta"]);
            dietaHistorico.push(resp[i]["cliente"]["idCliente"]);
            dietaHistorico.push(dataCadastro.getTime());
            
            insertDB.dietaHistorico(dietaHistorico);
        }

    }

    buscaHistoricoAlimentacao = function () {

        var resp = [{
            "idHistoricoAlimentacao": "1",
            "dietaHistorico": {
                "idDietaHistorico": "6",
                "dieta": null,
                "cliente": null,
                "dataCadastro": null
            },
            "cliente": {
                "idCliente": "1",
                "idNutricionista": null,
                "nome": null,
                "altura": null,
                "peso": null,
                "login": null,
                "senha": null,
                "ativo": null,
                "dataNascimento": null,
                "dataCadastro": null,
                "htmlPainelDieta": null
            },
            "alimento": "Batata frita",
            "dataCadastro": "2016-07-21 19:03:33"
        }, {
            "idHistoricoAlimentacao": "2",
            "dietaHistorico": {
                "idDietaHistorico": "6",
                "dieta": null,
                "cliente": null,
                "dataCadastro": null
            },
            "cliente": {
                "idCliente": "1",
                "idNutricionista": null,
                "nome": null,
                "altura": null,
                "peso": null,
                "login": null,
                "senha": null,
                "ativo": null,
                "dataNascimento": null,
                "dataCadastro": null,
                "htmlPainelDieta": null
            },
            "alimento": null,
            "dataCadastro": "2016-07-21 19:03:48"
        }];

        for (var i = 0; i < resp.length; i++) {
            
            var dietaHistoricoAlimentacao = [];
            
            var dataCadastro = new Date(resp[i]["dataCadastro"]);
            
            dietaHistoricoAlimentacao.push(parseInt(resp[i]["dietaHistorico"]["idDietaHistorico"]));
            dietaHistoricoAlimentacao.push(resp[i]["alimento"]);
            dietaHistoricoAlimentacao.push(dataCadastro.getTime());
            
            insertDB.dietaHistoricoAlimentacao(dietaHistoricoAlimentacao);
        }

    }

    buscaNoticias = function () {

        var resp = [{
            "idNoticia": "100",
            "nutricionista": {
                "idNutricionista": 1,
                "nome": "Thiago Moura",
                "cnpj": null,
                "email": null,
                "estado": null,
                "cidade": null,
                "bairro": null,
                "complemento": null,
                "ativo": null,
                "login": null,
                "senha": null,
                "dataCadastro": null
            },
            "titulo": null,
            "descricao": null,
            "imagem": "20160601_192029267903.jpg",
            "dataCadastro": "2016-06-01 19:18:19"
        }, {
            "idNoticia": "200",
            "nutricionista": {
                "idNutricionista": 1,
                "nome": "Thiago Moura",
                "cnpj": null,
                "email": null,
                "estado": null,
                "cidade": null,
                "bairro": null,
                "complemento": null,
                "ativo": null,
                "login": null,
                "senha": null,
                "dataCadastro": null
            },
            "titulo": "Grupos alimentares ",
            "descricao": null,
            "imagem": null,
            "dataCadastro": "2016-06-01 19:20:18"
        }, {
            "idNoticia": "300",
            "nutricionista": {
                "idNutricionista": 1,
                "nome": "Thiago Moura",
                "cnpj": null,
                "email": null,
                "estado": null,
                "cidade": null,
                "bairro": null,
                "complemento": null,
                "ativo": null,
                "login": null,
                "senha": null,
                "dataCadastro": null
            },
            "titulo": "Robinei mandando ver!",
            "descricao": "AUDSHIUA SHUDUAHS UHDAHUSHU DUHASUH DUSHAHUP ASPHUDHU ASPUHDHUA SUHUDHASHUI HUAISDUHI ASPUIHDPUHI ASUIHPDHUPAS PUHIDAUSIHP UHPIAS",
            "imagem": "20160602_232627778862.jpg",
            "dataCadastro": "2016-06-02 23:26:27"
        }];

        for (var i = 0; i < resp.length; i++) {
            
            var noticia = [];
            
            var dataCadastro = new Date(resp[i]["dataCadastro"]);
            
            noticia.push(parseInt(resp[i]["idNoticia"]));
            noticia.push(resp[i]["nutricionista"]["idNutricionista"]);
            noticia.push(resp[i]["nutricionista"]["nome"]);
            noticia.push(resp[i]["titulo"]);
            noticia.push(resp[i]["descricao"]);
            noticia.push(dataCadastro.getTime());
            
            insertDB.noticia(noticia);
        }

    }

    buscaAlimentos();
    buscaDietas();
    buscaHistoricoDietas();
    buscaHistoricoAlimentacao();
    buscaNoticias();
});