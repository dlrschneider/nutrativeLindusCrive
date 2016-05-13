app.service('insertDB', function ($ionicLoading, $timeout, retPedidos, enviarPedidoServidor) {
    var db = openDatabase('persisttDB', '1.0', 'Persistt DataBase', 5 * 1024 * 1024);

    return {
        novoPedido: function (ped, itensPed) {

            $ionicLoading.show({
                template: '<span style="position:relative;bottom:7px;"></span><ion-spinner icon="dots" style="fill: #bbb; stroke: #bbb;position:relative;bottom:-5px;"></ion-spinner>'
            });

            var idPedido = null;

            db.transaction(function (t) {
                t.executeSql('INSERT INTO pedidos("idCliente", "dtEmissao", "idTabelaPrecos", "idCondicaoPagamento", "cdVendedor", "dsObservacao", "dsStatus", "dtUltimoUpdate") VALUES (?, ?, ?, ?, ?, ?, ?, ?);', ped, sucessoPedidoDB, erroDB);

                t.executeSql('select max(idPedido) from pedidos;', [],
                    function (t, result) {
                        idPedido = result.rows.item(0)['max(idPedido)'];
                    }, erroDB);
            });

            db.transaction(function (t) {
                for (var i = 0; i < itensPed.length; i++) {
                    var arg = itensPed[i];
                    arg.unshift(idPedido);
                    t.executeSql('INSERT INTO itensDePedido VALUES (?, ?, ?, ?, ?, ?);', arg, sucessoItensDePedidoDB, erroDB);
                }

            });

            function sucessoPedidoDB() {
                console.log('sucesso no insert pedidos');
                $timeout(function () {
                    retPedidos.go();
                    $ionicLoading.hide();
                }, 500);
            };

            function sucessoItensDePedidoDB() {
                console.log('sucesso no insert itensDePedido');
            };
            
            $timeout(function() {
                enviarPedidoServidor.go(idPedido);
            }, 3000);
            

            function erroDB() {
                console.log('erro no insert novoPedido');
                $ionicLoading.hide();
            };
        },

        itemDePedido: function (item) {

            db.transaction(function (t) {
                var arg = item;
                t.executeSql('INSERT INTO itensDePedido VALUES (?, ?, ?, ?, ?, ?);', arg, OkDB, erroDB);

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