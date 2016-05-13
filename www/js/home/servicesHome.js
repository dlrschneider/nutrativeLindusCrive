app.service('quantidadeTab', function ($localStorage) {  
    
    var sideMenuToggle = 0;
    
    return {
        somaPedido: function() {
            $localStorage.qtdPedidos += 1;
        },
        somaCliente: function() {
            $localStorage.qtdClientes += 1;
        },
        somaProduto: function() {
            $localStorage.qtdProdutos += 1;
        },
        subtraiPedido: function() {
            $localStorage.qtdPedidos -= 1;
        },
        subtraiCliente: function() {
            $localStorage.qtdClientes -= 1;
        },
        subtraiProduto: function() {
            $localStorage.qtdProdutos -= 1;
        },
        getPedidos: function() {
            return $localStorage.qtdPedidos;
        },
        getClientes: function() {
            return $localStorage.qtdClientes;
        },
        getProdutos: function() {
            return $localStorage.qtdProdutos;
        },
        zeraPedidos: function() {
            $localStorage.qtdPedidos = 0;
        },
        zeraClientes: function() {
            $localStorage.qtdClientes = 0;
        },
        zeraProdutos: function() {
            $localStorage.qtdProdutos = 0;
        },
        
        vSideMenu: function(v) {
            var b;
            
            b = sideMenuToggle;
            sideMenuToggle = v;
            
            return b;
        }
    }
});