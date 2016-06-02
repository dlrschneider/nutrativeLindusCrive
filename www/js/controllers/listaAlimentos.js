app.controller('ListaAlimentosController', function($scope, $ionicFilterBar, selectDB, $ionicModal, $ionicHistory, insertDB) {
    
    $scope.alimentos = selectDB.alimento();
    
    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.alimentos,
            update: function (filteredItems, filterText) {
                $scope.alimentos = filteredItems;
            }
        });
    };
    
    $scope.qtdItens = 25;
    
    $scope.loadMore = function () {
        if($scope.alimentos.length > $scope.qtdItens) {
            $scope.qtdItens += 25;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    
    $scope.showFilterBar();
    
    $ionicModal.fromTemplateUrl('./views/modal-adicionaAlimento.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    })

    $scope.openModal = function () {
        $scope.modal.show()
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    
    $scope.selecionaAlimento = function (alimento) {
        $scope.idAlimentoModal = alimento[0];
        $scope.nomeAlimentoModal = alimento[2];
        $scope.openModal();
    }
    
    $scope.adicionaHistoricoAlimento = function (qtd) {
        
        var dtEm = new Date().getTime();
        var args = [];
        
        args.push($scope.idAlimentoModal);
        args.push(qtd);
        args.push(dtEm);
        
        insertDB.historicoAlimentacao(args);
        
        $scope.closeModal();
        $ionicHistory.goBack();
    }
});