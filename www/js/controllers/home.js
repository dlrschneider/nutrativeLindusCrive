app.controller('HomeController', function ($scope, $ionicModal, $localStorage, infoLogin, selectDB, insertDB) {
      
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
    $scope.calDiariaTotal = $localStorage.calDiariaTotal;
    $scope.calConsumidas = $localStorage.calConsumidas;
    $scope.sexo = $localStorage.sexo;
    $scope.idade = $localStorage.idade;
    $scope.fatorDeAtividade = $localStorage.fatorDeAtividade;
    
    $scope.calRestantesDia = $scope.calDiariaTotal - $scope.calConsumidas;
    
    $scope.imc = $scope.peso / ($localStorage.altura * $localStorage.altura);
    $scope.imc = $scope.imc.toFixed(2);
    if($scope.imc < 17) {
        $scope.msgImc = "Muito abaixo do peso";
    } else if($scope.imc < 18.5) {
        $scope.msgImc = "Abaixo do peso";
    } else if($scope.imc < 25) {
        $scope.msgImc = "Peso normal";
    } else if($scope.imc < 30) {
        $scope.msgImc = "Acima do peso";
    } else if($scope.imc < 35) {
        $scope.msgImc = "Obesidade I";
    } else if($scope.imc < 40) {
        $scope.msgImc = "Obesidade II (severa)";
    } else {
        $scope.msgImc = "Obesidade III (mórbida)";
    }
    
    if($scope.sexo === "H") {
       $scope.tmb = 66 + (13.7 * $scope.peso) + (5 * ($scope.altura*100)) - (6.8 * $scope.idade);
    } else {
       $scope.tmb = 655 + (9.6 * $scope.peso) + (1.8 * ($scope.altura*100)) - (4.7 * $scope.idade);
    }
    $scope.tmb = $scope.tmb.toFixed(2);
    
    $scope.calManterPeso = $scope.tmb * $scope.fatorDeAtividade;
    $scope.calManterPeso = $scope.calManterPeso.toFixed(2);
    $scope.calEmagrecer = ($scope.tmb * $scope.fatorDeAtividade) * 0.8;
    $scope.calEmagrecer = $scope.calEmagrecer.toFixed(2);
    $scope.calEngordar = ($scope.tmb * $scope.fatorDeAtividade) * 1.15;
    $scope.calEngordar = $scope.calEngordar.toFixed(2);
    
    $ionicModal.fromTemplateUrl('./views/modal-simples.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show()
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    $scope.adicionarAlimento = function () {
        
        $scope.mensagemModalSimples = "Bem vindo " + infoLogin.getDsNm();
        $scope.botaoModalSimples = "Começar!";
        $scope.openModal();
    }

});