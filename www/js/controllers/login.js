app.controller('LoginController', function ($scope, $state, reqServer, infoLogin, $ionicLoading, $ionicModal, $localStorage, $http, $timeout) {

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

    $scope.login = function () {

        $ionicLoading.show({
            template: '<span style="position:relative;bottom:7px;"></span><ion-spinner icon="dots" style="fill: #bbb; stroke: #bbb;position:relative;bottom:-5px;"></ion-spinner>'
        });
        
        if ($scope.login.usuario !== undefined) {
            if ($scope.login.senha !== undefined) {
               var dados = {login: $scope.login.usuario, senha: $scope.login.senha};
               
                var logou = false;
               $timeout(function() {
                   if(!logou) {
                        $scope.mensagemModalSimples = "Verifique sua conexão com a internet";
                        $scope.botaoModalSimples = "Tentar novamente";
                        $scope.openModal();

                        $ionicLoading.hide();
                   }
               }, 8000);
                
               $http.post('http://localhost/nutrative/index.php/ws/app2site/login/'+ $scope.login.usuario +'/'+ $scope.login.senha).then(function (resp) {

                  logou = true;
                  infoLogin.setDsNm(resp.data.nome);
                  infoLogin.setUsu($scope.login.usuario.trim());
                  infoLogin.setSen($scope.login.senha);
                  infoLogin.setIdCliente(resp.data.idCliente);
                  infoLogin.setIdNutricionista(resp.data.idNutricionista);
                  infoLogin.setAltura(resp.data.altura);
                  infoLogin.setPeso(resp.data.peso);
                  
                  $state.go('menu.home');

                  $ionicLoading.hide();

                  if ($localStorage.primeiroLoginBV === undefined) {

                      $scope.mensagemModalSimples = "Bem vindo " + infoLogin.getDsNm();
                      $scope.botaoModalSimples = "Começar!";
                      $scope.openModal();

                      $localStorage.primeiroLoginBV = true;
                  }
                  
                });

            } else {

                $scope.mensagemModalSimples = "Senha precisa ser preenchida";
                $scope.botaoModalSimples = "Tentar novamente";
                $scope.openModal();

                $ionicLoading.hide();
            }

        } else {

            $scope.mensagemModalSimples = "Usuário inválido";
            $scope.botaoModalSimples = "Tentar novamente";
            $scope.openModal();

            $ionicLoading.hide();
        }
    }
});