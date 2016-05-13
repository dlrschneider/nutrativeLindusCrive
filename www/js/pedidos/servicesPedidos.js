app.service('retPedidos', function ($state) {
    return {
        go: function () {
            $state.go('persistt.pedidos');
        }
    }
});

app.service('clienteSel', function () {
    var cliente = [];
    
    return {
        getCliente: function () {
            return cliente;
        },
        setCliente: function (cli) {
            cliente = cli;
        },
        resCliente: function () {
            cliente = [];
        }
    }
});

app.service('tabelaPrecoSel', function () {
    var tabelaPreco = [];
    
    return {
        getTabelaPreco: function () {
            return tabelaPreco;
        },
        setTabelaPreco: function (tbl) {
            tabelaPreco = tbl;
        },
        resTabelaPreco: function () {
            tabelaPreco = [];
        }
    }
});

app.service('prazoSel', function () {
    var prazo = [];
    
    return {
        getPrazo: function () {
            return prazo;
        },
        setPrazo: function (pr) {
            prazo.push(pr);
        },
        resPrazo: function () {
            prazo = [];
        }
    }
});

app.service('observacao', function () {
    var observacao = [];
    
    return {
        getObservacao: function () {
            return observacao;
        },
        setObservacao: function (obs) {
            observacao = obs;
        },
        resObservacao: function () {
            observacao = [];
        }
    }
});

app.service('itensAdc', function () {
    var itens = [];
    var precoItens = 0;
    
    return {
        getItens: function () {
            return itens;
        },
        setItens: function (obs) {
            itens.push(obs);
        },
        resItens: function () {
            itens = [];
        },
        vlItens: function (pi) {
            precoItens += pi;
        },
        getVlItens: function () {
            return precoItens;
        },
        delVlItens: function (pi) {
            precoItens = 0;
        }
    }
});

app.service('listaItens', function () {
    var lista = [];
    
    return {
        getLista: function () {
            return lista;
        },
        setLista: function (l) {
            lista = l;
        },
        resLista: function () {
            lista = [];
        }
    }
});

app.service('pedidoSelecionado', function () {
    var codSelecionado = -1;

    return {
        getCodigoSel: function () {
            return codSelecionado;
        },
        setCodigoSel: function (cod) {
            codSelecionado = cod;
        }
    }
});

app.service('enviarPedidoServidor', function (selectDB, reqServer, $timeout) {
    
    return {
        go: function (idPedido) {
            
            var pedidoSelecionado = selectDB.detalhesPedido(idPedido);
            var itensPedido = selectDB.itensPedido(idPedido);
            
            $timeout(function() {
                
                var sqItens = 0;
                var itens = [];
                
                for(var i = 0; i<itensPedido.length; i++) {
                    var item = [itensPedido[i][1], itensPedido[i][7], itensPedido[i][4], itensPedido[i][5]];
                    itens.push(item);
                }
                
                if(pedidoSelecionado[0][9] === null) {
                    var cdPedido = "0000";
                } else {
                    var cdPedido = pedidoSelecionado[0][9];
                }
                
                var pedido = [[pedidoSelecionado[0][0], pedidoSelecionado[0][7], cdPedido,pedidoSelecionado[0][8], pedidoSelecionado[0][10], pedidoSelecionado[0][5], pedidoSelecionado[0][11].toString(), itens]];
                
                var pedidoServidor = reqServer.MOBILE_ENVIA_PEDIDOS(pedido);
            }, 3000);
            
            
            return;
        }
    }
});