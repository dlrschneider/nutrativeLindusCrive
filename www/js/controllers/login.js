app.controller('LoginController', function ($scope, $state, reqServer, infoLogin, $ionicLoading, $ionicModal, $localStorage) {

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

    //    verificaLogin = function () {
    //        
    //        $ionicLoading.show({
    //            template: '<span style="position:relative;bottom:7px;"></span><ion-spinner icon="dots" style="fill: #bbb; stroke: #bbb;position:relative;bottom:-5px;"></ion-spinner>'
    //        });
    //        
    //        if (infoLogin.getDsNm() !== undefined) {
    //            $state.go('persistt.home');
    //        }
    //        
    //        $ionicLoading.hide();
    //    }
    //    
    //    verificaLogin();

    $scope.login = function () {

        $ionicLoading.show({
            template: '<span style="position:relative;bottom:7px;"></span><ion-spinner icon="dots" style="fill: #bbb; stroke: #bbb;position:relative;bottom:-5px;"></ion-spinner>'
        });

        if ($scope.login.usuario !== undefined) {
            if ($scope.login.senha !== undefined) {

                if (0 === 0) {

                    infoLogin.setDsNm("Daniel Schneider");
                    infoLogin.setUsu($scope.login.usuario.trim());
                    infoLogin.setSen($scope.login.senha);

                    $state.go('menu.home');

                    if ($localStorage.primeiroLoginBV === undefined) {

                        $scope.mensagemModalSimples = "Bem vindo " + infoLogin.getDsNm();
                        $scope.botaoModalSimples = "Começar!";
                        $scope.openModal();

                        $localStorage.primeiroLoginBV = true;
                    }

                    $ionicLoading.hide();
                } else {
                    $scope.mensagemModalSimples = resp2.data.result.msgErr;
                    $scope.botaoModalSimples = "Tentar novamente";
                    $scope.openModal();

                    $ionicLoading.hide();
                }


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