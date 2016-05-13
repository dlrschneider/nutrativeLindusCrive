app.controller('ProdutosController', function ($scope, $ionicSideMenuDelegate, $ionicFilterBar, listaProdutos) {

    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.produtos,
            update: function (filteredItems, filterText) {
                $scope.produtos = filteredItems;
            }
        });
    };

    $scope.produtos = listaProdutos.getListaProdutos();
    
    $scope.qtdItens = 25;
    
    $scope.loadMore = function () {
        if($scope.produtos.length > $scope.qtdItens) {
            $scope.qtdItens += 25;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    
});