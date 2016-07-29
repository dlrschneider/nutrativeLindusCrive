app.controller('ReceitaController', function($scope, $state, tipoListaRegistroAlimento, selectDB) {
    
    $scope.$state = $state;
    
    $scope.manha = selectDB.dietaAlimento("Manhã");
    $scope.almoco = selectDB.dietaAlimento("Almoço");
    $scope.lanche = selectDB.dietaAlimento("Lanche");
    $scope.janta = selectDB.dietaAlimento("Janta");
    
    $scope.addAlimentoTp1 = function() {
        $state.go('menu.listaAlimentos');
        tipoListaRegistroAlimento.setTipo(1);
    }
});