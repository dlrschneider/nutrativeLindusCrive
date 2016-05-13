app.service('deleteDB', function ($ionicLoading, $timeout, retPedidos) {
    var db = openDatabase('persisttDB', '1.0', 'Persistt DataBase', 5 * 1024 * 1024);
    
    return {
        deleteItem: function (idPedido, sqItemPedido) {
            
            db.transaction(function (t) {
                t.executeSql('DELETE FROM ItensDePedido WHERE idPedido = '+idPedido+' and sqItemPedido = '+sqItemPedido+';', [], OkDB, erroDB);
            });
            
            function erroDB() {
                return;
            };
            
            function OkDB() {
                return;
            };
            
            return;
        },
        
        deletePedido: function (idPedido) {
            
            db.transaction(function (t) {
                t.executeSql('DELETE FROM pedidos WHERE idPedido = '+idPedido+';', [], OkDB, erroDB);
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