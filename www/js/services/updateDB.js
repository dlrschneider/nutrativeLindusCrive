app.service('updateDB', function ($ionicLoading, $timeout, retPedidos) {
    var db = openDatabase('persisttDB', '1.0', 'Persistt DataBase', 5 * 1024 * 1024);

    return {
        alteraQtdItem: function (idPedido, sqItemPedido, quantidade) {

            db.transaction(function (t) {
                t.executeSql('UPDATE ItensDePedido SET qtProdutos = ' + quantidade + ' WHERE idPedido = ' + idPedido + ' and sqItemPedido = ' + sqItemPedido + ';', [], OkDB, erroDB);
            });

            function erroDB() {
                return;
            };

            function OkDB() {
                return;
            };

            return;
        }
    }
});