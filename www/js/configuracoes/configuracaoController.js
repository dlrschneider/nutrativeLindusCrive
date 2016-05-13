app.controller('ConfiguracoesController', function ($scope, $ionicSideMenuDelegate, $ionicModal, $localStorage, listaProdutos, quantidadeTab) {
    
    $scope.$localStorage = $localStorage;
    
    $scope.situacaoListarPedidos = "Todos";
    if($localStorage.qtListaPedidos===1) {
        $scope.situacaoListarPedidos = "Últimos 30 dias"
    } else if($localStorage.qtListaPedidos===3) {
        $scope.situacaoListarPedidos = "Últimos 3 meses"
    } else if($localStorage.qtListaPedidos===6) {
        $scope.situacaoListarPedidos = "Últimos 6 meses"
    }
    
    $scope.listarPedidos = function(v) {
        if(v===0) {
            $localStorage.qtListaPedidos = null; 
            $scope.situacaoListarPedidos = 'Todos';
        } else if(v===1) {
            $localStorage.qtListaPedidos = 1;
            $scope.situacaoListarPedidos = "Últimos 30 dias"
        } else if(v===3) {
            $localStorage.qtListaPedidos = 3;
            $scope.situacaoListarPedidos = "Últimos 3 meses"
        } else if(v===6) {
            $localStorage.qtListaPedidos = 6;
            $scope.situacaoListarPedidos = "Últimos 6 meses"
        }
    }
    
    $ionicModal.fromTemplateUrl('./views/app/persistt-configuracoes/freqSincronizacao-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalSincronizacao = modal;
    });
    $ionicModal.fromTemplateUrl('./views/app/persistt-configuracoes/listarPedidos-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalListarPedidos = modal;
    });
    
    $scope.limparDB = function () {
        
        var db = openDatabase('persisttDB', '1.0', 'Persistt DataBase', 5 * 1024 * 1024);
        db.transaction(function (t) {
            t.executeSql('drop table cidades');
            t.executeSql('drop table clientes');
            t.executeSql('drop table enderecos');
            t.executeSql('drop table emails');
            t.executeSql('drop table telefones');
            t.executeSql('drop table empresas');
            t.executeSql('drop table UnidadesDeMedida');
            t.executeSql('drop table Produtos');
            t.executeSql('drop table tabelaDePrecos');
            t.executeSql('drop table vendedor');
            t.executeSql('drop table listaPrecos');
            t.executeSql('drop table condicoesDePagamento');
            t.executeSql('drop table condicoesDaTabelaDePagamento');
            t.executeSql('drop table pedidos');
            t.executeSql('drop table itensDePedido');
            
            quantidadeTab.zeraPedidos();
            quantidadeTab.zeraClientes();
            quantidadeTab.zeraProdutos();
            
            delete $localStorage.hus;
            listaProdutos.deleteListaProdutos();
        });
        $scope.date = "Ainda não foi feita nenhuma sincronização";
    }

    if ($localStorage.hus === undefined) {
        $scope.date = "Ainda não foi feita nenhuma sincronização";
    } else {
        $scope.date = $localStorage.hus;
    }

    $scope.$on('$destroy', function () {
        $scope.modalSincronizacao.remove();
        $scope.modalListarPedidos.remove();
    });
});