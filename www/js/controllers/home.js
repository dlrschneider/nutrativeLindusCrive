app.controller('HomeController', function ($scope, $ionicModal, infoLogin) {

    $ionicModal.fromTemplateUrl('./views/app/modal-simples.html', {
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