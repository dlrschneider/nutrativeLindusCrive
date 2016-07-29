app.controller('AlimentacaoController', function($scope, $state, datasService, nomeMes, selectDB, $timeout, tipoListaRegistroAlimento) {
    
    $scope.$state = $state;
    
    $scope.addAlimentoTp1 = function() {
        $state.go('menu.listaAlimentos');
        tipoListaRegistroAlimento.setTipo(1);
    }
    
    $scope.addAlimentoTp2 = function() {
        $state.go('menu.listaAlimentos');
        tipoListaRegistroAlimento.setTipo(2);
    }
    
    var dataInicio = new Date(datasService.getDataAlimentacao().getTime());
    dataInicio.setHours(0);
    dataInicio.setMinutes(0);
    dataInicio.setSeconds(0);
    dataInicio.setMilliseconds(0);

    var dataFim = new Date(datasService.getDataAlimentacao().getTime());
    dataFim.setHours(23);
    dataFim.setMinutes(59);
    dataFim.setSeconds(59);
    dataFim.setMilliseconds(999);
    
    $scope.historicoAlimentos = selectDB.historicoAlimentacao(dataInicio.getTime(), dataFim.getTime());
    
    getDataTopo = function () {
        var dia = datasService.getDataAlimentacao().getDate() < 10 ? "0" + datasService.getDataAlimentacao().getDate() : datasService.getDataAlimentacao().getDate();
        $scope.dataTopo = dia + " de " + nomeMes.getNomeMes(datasService.getDataAlimentacao().getMonth()) + " de " + datasService.getDataAlimentacao().getFullYear();
    }
    
    $scope.setaDataTopo = function(tipo) {
        if(tipo === "+") {
            datasService.aumentaDataAlimentacao();
        } else {
            datasService.diminuiDataAlimentacao();
        }
        
        $state.go('menu.alimentacao', {}, {reload: true});
    }
    
    getDataTopo();
});