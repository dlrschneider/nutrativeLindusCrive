app.service('idCliente', function () {
    var idCliente = 0;
    
    return {
        getIdCliente: function () {
            return idCliente;
        },
        setIdCliente: function (cod) {
            idCliente = cod;
        }
    }
});