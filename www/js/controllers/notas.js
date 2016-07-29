app.controller( 'NotasController', function($scope, $state, $http, $ionicModal, tipoListaRegistroAlimento, insertDB, selectDB, $timeout) {
    
    $scope.notas = selectDB.anotacao();
    $scope.model = [];
    
    $scope.addAlimentoTp1 = function() {
        $state.go('menu.listaAlimentos');
        tipoListaRegistroAlimento.setTipo(1);
    }
    
    $ionicModal.fromTemplateUrl('./views/modal-novaNota.html', {
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
    
    $scope.adicionarNota = function() {
        
        var anotacao = [];

        var dataCadastro = new Date();

        anotacao.push(1);
        anotacao.push($scope.model.nota);
        anotacao.push(dataCadastro.getTime());

        insertDB.anotacao( anotacao );
        
        $http({
           url: 'http://localhost/nutrative/index.php/ws/app2site/notas/',
           data: $.param({obj: anotacao}),
           method: 'POST',
           headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function (resp) {
           console.log(resp.data);
        });
        
        $scope.closeModal();
        
        $timeout(function() {
            $scope.notas = selectDB.anotacao();
        }, 100);
    }
});