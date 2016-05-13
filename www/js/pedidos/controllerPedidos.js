app.controller('PedidosController', function ($scope, $ionicSideMenuDelegate, $ionicFilterBar, $ionicModal, $state, pedidoSelecionado, clienteSel, tabelaPrecoSel, observacao, itensAdc, selectDB, listaItens, $timeout, $localStorage) {
    
    var filterBarInstance;
    
    var bkpPedidos = [];
    
    $scope.pedidos = selectDB.pedidos();
    
    if ($localStorage.qtListaPedidos === null || $localStorage.qtListaPedidos === undefined) {
        $scope.dtShow = 0;
    } else {
        $scope.dtShow = new Date();
        $scope.dtShow.setMonth($scope.dtShow.getMonth() - $localStorage.qtListaPedidos);
    }

    $scope.qtdItens = 25;

    $scope.loadMore = function () {
        if ($scope.pedidos.length > $scope.qtdItens) {
            $scope.qtdItens += 25;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.pedidos,
            update: function (filteredItems, filterText) {
                $scope.pedidos = filteredItems;
            }
        });
    };

    $ionicModal.fromTemplateUrl('./views/app/persistt-pedidos/pedido-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show()
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    $scope.resetaFiltro = function () {
        if (bkpPedidos.length !== 0) {
            console.log('restaura pedidos');
            $scope.pedidos = bkpPedidos;
        }
    }

    $scope.filtrarPorData = function (dataDe, dataAte) {
        $scope.filtradosData = [];

        if (bkpPedidos.length == 0) {
            bkpPedidos = $scope.pedidos;
        }
        if ($scope.pedidos.length < bkpPedidos.length) {
            $scope.pedidos = bkpPedidos;
        }

        if (dataDe !== undefined && dataAte !== undefined && dataDe !== null && dataAte !== null) {
            for (var i = 0; i < $scope.pedidos.length; i++) {
                if ($scope.pedidos[i][1] >= dataDe.getTime() && $scope.pedidos[i][1] <= (dataAte.getTime() + 86340000)) {
                    $scope.filtradosData.push($scope.pedidos[i]);
                }
            }
            $scope.pedidos = $scope.filtradosData;
        } else if (dataDe !== undefined && dataDe !== null) {
            for (var i = 0; i < $scope.pedidos.length; i++) {
                if ($scope.pedidos[i][1] >= dataDe.getTime()) {
                    $scope.filtradosData.push($scope.pedidos[i]);
                }
            }
            $scope.pedidos = $scope.filtradosData;
        } else if (dataAte !== undefined && dataAte !== null) {
            for (var i = 0; i < $scope.pedidos.length; i++) {
                if ($scope.pedidos[i][1] <= (dataAte.getTime() + 86340000)) {
                    $scope.filtradosData.push($scope.pedidos[i]);
                }
            }
            $scope.pedidos = $scope.filtradosData;
        }

        $scope.closeModal();
    }

    $scope.$state = $state;

    $scope.setaCodigoPedido = function (cod) {
        pedidoSelecionado.setCodigoSel(cod);
        tabelaPrecoSel.resTabelaPreco();
        itensAdc.resItens();
        listaItens.resLista();
        $state.go('persistt.pedidoDetalhes');
    }

    $scope.resetaPedido = function () {
        clienteSel.resCliente();
        tabelaPrecoSel.resTabelaPreco();
        observacao.resObservacao();
        itensAdc.resItens();
    }
});

app.controller('PedidoDetalheController', function ($scope, $ionicSideMenuDelegate, $state, pedidoSelecionado, selectDB, idCliente, $timeout, $ionicModal, toast, updateDB, deleteDB, quantidadeTab, tabelaPrecoSel, itensAdc, insertDB) {

    $scope.itemEditSel = [];
    var indexEditSel;

    $scope.serviceItens = itensAdc;

    $scope.itens = itensAdc.getItens();

    $scope.$watch('serviceItens.getItens()', function () {
        $scope.itens = itensAdc.getItens();
    });

    $scope.$watch('serviceItens.getVlItens()', function () {
        var qtdNovosItens = $scope.itens.length;

        for (var i = 0; i < qtdNovosItens; i++) {
            var aux = [];
            var auxDB = [];
            var sqItem = 0;

            for (var a = 0; a < $scope.itensPedido.length; a++) {
                if (sqItem < $scope.itensPedido[a][1]) {
                    sqItem = $scope.itensPedido[a][1];
                }
            }

            aux.push($scope.pedidoSelecionado);
            aux.push(sqItem + 1);
            aux.push($scope.itens[i][0]);
            aux.push($scope.itens[i][1]);
            aux.push($scope.itens[i][5]);
            aux.push($scope.itens[i][4]);
            aux.push($scope.itens[i][6]);

            console.log($scope.itens[i]);

            $scope.itensPedido.push(aux);

            var dtEm = new Date().getTime();

            auxDB.push($scope.pedidoSelecionado);
            auxDB.push(sqItem + 1);
            auxDB.push($scope.itens[i][2]);
            auxDB.push($scope.itens[i][5]);
            auxDB.push($scope.itens[i][4]);
            auxDB.push(dtEm);

            insertDB.itemDePedido(auxDB);

        }

        itensAdc.resItens();

        if (qtdNovosItens > 0) {
            toast.makeToast("Itens adicionados ao pedido", "long", "bottom");
        }
    });

    $ionicModal.fromTemplateUrl('./views/app/persistt-pedidos/modal-itens-opc.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalItens = modal;
    });

    $ionicModal.fromTemplateUrl('./views/app/persistt-pedidos/pedido-modal-quantidade-edit.html', {
        scope: $scope,
    }).then(function (modal) {
        $scope.modalQtd = modal;
    });

    $ionicModal.fromTemplateUrl('./views/app/persistt-pedidos/pedido-modal-exclusao.html', {
        scope: $scope,
    }).then(function (modal) {
        $scope.modalExc = modal;
    });

    $scope.openModalExc = function () {
        $scope.modalExc.show()
    };

    $scope.closeModalExc = function () {
        $scope.modalExc.hide();
    };

    $scope.openModalQtd = function () {
        $scope.modalQtd.show()
    };

    $scope.closeModalQtd = function () {
        $scope.modalQtd.hide();
    };

    $scope.openModalItens = function (item, index) {
        $scope.itemEditSel = item;
        indexEditSel = index;
        $scope.quantidade = $scope.itemEditSel[4];
        $scope.modalItens.show()
    };

    $scope.closeModalItens = function () {
        $scope.modalItens.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modalItens.remove();
        $scope.modalQtd.remove();
        $scope.modalExc.remove();
    });

    $scope.alteraQtdItem = function (qt) {

        for (var i = 0; $scope.itensPedido.length > i; i++) {

            if ($scope.itensPedido[i][1] === $scope.itemEditSel[1]) {

                if ($scope.itensPedido[i][4] !== qt) {

                    if (qt !== null && qt !== 0) {

                        updateDB.alteraQtdItem($scope.itensPedido[i][0], $scope.itensPedido[i][1], qt);

                        $scope.itensPedido[i][4] = qt;
                        $scope.itensPedido[i][6] = qt * parseFloat($scope.itensPedido[i][5]);


                        i = $scope.itensPedido.length;

                        toast.makeToast("Alteração salva", "short", "bottom");
                    } else {
                        toast.makeToast("Valor inválido", "short", "bottom");
                    }
                } else {
                    toast.makeToast("Quantidade inalterada", "short", "bottom");
                }
            }
        }
    }

    $scope.excluiItem = function () {
        if ($scope.itensPedido.length > 1) {

            for (var i = 0; $scope.itensPedido.length > i; i++) {
                if ($scope.itensPedido[i][1] === $scope.itemEditSel[1]) {

                    deleteDB.deleteItem($scope.itensPedido[i][0], $scope.itensPedido[i][1]);

                    $scope.itensPedido.splice(indexEditSel, 1);

                    i = $scope.itensPedido.length;

                    toast.makeToast("Alteração salva", "short", "bottom");
                }
            }
        } else {
            console.log('É necessário ter ao menos um item no pedido');
            toast.makeToast("É necessário ter ao menos um item no pedido", "long", "bottom");
        }
    }

    $scope.deletarPedido = function () {

        for (var i = 0; $scope.itensPedido.length > i; i++) {
            deleteDB.deleteItem($scope.itensPedido[i][0], $scope.itensPedido[i][1]);
        }

        deleteDB.deletePedido($scope.pedidoSelecionado);

        quantidadeTab.subtraiPedido();

        $state.go("persistt.pedidos");

        console.log("Pedido excluído");
        toast.makeToast("Pedido excluído", "short", "bottom");
    }

    $scope.adicionaItens = function () {
        tabelaPrecoSel.setTabelaPreco($scope.pedido[0][8]);
        $state.go('persistt.pedidoNovoItens');
    }

    $scope.pedidoSelecionado = pedidoSelecionado.getCodigoSel();

    $scope.pedido = selectDB.detalhesPedido($scope.pedidoSelecionado);
    $scope.itensPedido = selectDB.itensPedido($scope.pedidoSelecionado);


    $scope.detCliente = function (idC) {
        idCliente.setIdCliente(idC);
        $state.go("persistt.clienteDetalhes");
    }

    $scope.$watch('itensPedido', function (newVal, oldVal) {
        $scope.total = 0;
        for (var i = 0; i < $scope.itensPedido.length; i++) {
            $scope.total += $scope.itensPedido[i][6];
        }
    }, true);
});

app.controller('PedidoNovoController', function ($scope, $ionicSideMenuDelegate, $state, selectDB, insertDB, clienteSel, tabelaPrecoSel, observacao, itensAdc, quantidadeTab, toast, $ionicModal) {

    $scope.$state = $state;
    $scope.serviceCliente = clienteSel;
    $scope.serviceTabelaPreco = tabelaPrecoSel;
    $scope.serviceObservacao = observacao;
    $scope.serviceItens = itensAdc;

    $scope.cliente = clienteSel.getCliente();
    $scope.tabela = tabelaPrecoSel.getTabelaPreco();
    $scope.observacoes = observacao.getObservacao();
    $scope.itens = itensAdc.getItens();
    $scope.vlItens = itensAdc.getVlItens();

    $scope.itemEditSel = [];
    var indexEditSel;

    $ionicModal.fromTemplateUrl('./views/app/persistt-pedidos/modal-itens-opc.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalItens = modal;
    });

    $ionicModal.fromTemplateUrl('./views/app/persistt-pedidos/pedido-modal-quantidade-edit.html', {
        scope: $scope,
    }).then(function (modal) {
        $scope.modalQtd = modal;
    });

    $scope.openModalQtd = function () {
        $scope.modalQtd.show()
    };

    $scope.closeModalQtd = function () {
        $scope.modalQtd.hide();
    };

    $scope.openModalItens = function (item, index) {

        $scope.itemEditSel = item;
        indexEditSel = index;
        $scope.quantidade = $scope.itemEditSel[5];
        $scope.modalItens.show()
    };

    $scope.closeModalItens = function () {
        $scope.modalItens.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modalItens.remove();
        $scope.modalQtd.remove();
    });

    $scope.alteraQtdItem = function (qt) {

        console.log(itensAdc.getItens());
        console.log($scope.itens);
        console.log($scope.itemEditSel);

        for (var i = 0; $scope.itens.length > i; i++) {

            if ($scope.itens[i][2] === $scope.itemEditSel[2]) {

                if ($scope.itens[i][4] !== qt) {

                    if (qt !== null && qt !== 0) {

                        $scope.vlItens = ($scope.vlItens - $scope.itens[i][6]) + qt * parseFloat($scope.itens[i][4])
                        $scope.itens[i][5] = qt;
                        $scope.itens[i][6] = qt * parseFloat($scope.itens[i][4]);

                        i = $scope.itens.length;

                    } else {
                        toast.makeToast("Valor inválido", "short", "bottom");
                    }
                } else {
                    toast.makeToast("Quantidade inalterada", "short", "bottom");
                }
            }
        }
    }

    $scope.excluiItem = function () {
        for (var i = 0; $scope.itens.length > i; i++) {
            if ($scope.itens[i][2] === $scope.itemEditSel[2]) {
                console.log($scope.itens[i][6]);
                $scope.vlItens = $scope.vlItens - $scope.itens[i][6];
                $scope.itens.splice(indexEditSel, 1);

                i = $scope.itens.length;
            }
        }
    }

    $scope.$watch('serviceCliente.getCliente()', function () {
        $scope.cliente = clienteSel.getCliente();
    });

    $scope.$watch('serviceTabelaPreco.getTabelaPreco()', function () {
        $scope.tabela = tabelaPrecoSel.getTabelaPreco();

        if ($scope.tabela.length > 0) {
            $scope.prazo = selectDB.prazo($scope.tabela[1]);
        }
    });

    $scope.$watch('serviceObservacao.getObservacao()', function () {
        $scope.observacoes = observacao.getObservacao();
    });

    $scope.$watch('serviceItens.getItens()', function () {
        $scope.itens = itensAdc.getItens();
    });

    $scope.$watch('serviceItens.getVlItens()', function () {
        $scope.vlItens = itensAdc.getVlItens();
    });

    $scope.addPedido = function () {

        if (!$scope.cliente.length > 0) {
            console.log('seleciona o cliente ai, pfvr');
            toast.makeToast("Selecione um cliente", "short", "bottom");
        } else if (!$scope.tabela.length > 0) {
            console.log('pffff, seleciona uma tabela de preço!');
            toast.makeToast("Selecione uma tabela de preço", "short", "bottom");
        } else if (!$scope.itens.length > 0) {
            console.log('sem itens não dá!');
            toast.makeToast("Nenhum item selecionado", "short", "bottom");
        } else {

            var dtEm = new Date().getTime();
            var pedido = [];
            var itensPedido = [];

            pedido.push($scope.cliente[2]);
            pedido.push(dtEm);
            pedido.push($scope.tabela[1]);
            pedido.push($scope.prazo[0][0]);
            pedido.push(null);
            pedido.push($scope.observacoes);
            pedido.push("A ser enviado");
            pedido.push(dtEm);

            for (var i = 0; i < $scope.itens.length; i++) {
                var itp = [];
                itp.push(i + 1);
                itp.push($scope.itens[i][2]);
                itp.push($scope.itens[i][5]);
                itp.push($scope.itens[i][4]);
                itp.push(dtEm);
                itensPedido.push(itp);
            }

            insertDB.novoPedido(pedido, itensPedido);
            quantidadeTab.somaPedido();

        }
    };

});

app.controller('PedidoNovoClienteController', function ($scope, $ionicSideMenuDelegate, $ionicFilterBar, selectDB, $state, clienteSel) {

    $scope.qtdItens = 25;

    $scope.clientes = selectDB.clientes();

    $scope.loadMore = function () {
        if ($scope.clientes.length > $scope.qtdItens) {
            $scope.qtdItens += 25;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    $scope.selCliente = function (selecionado) {
        clienteSel.setCliente(selecionado);
        $state.go('persistt.pedidoNovo');
    }

    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.clientes,
            update: function (filteredItems, filterText) {
                $scope.clientes = filteredItems;
            }
        });
    };
});

app.controller('PedidoNovoTabelaPrecoController', function ($scope, $ionicSideMenuDelegate, $ionicFilterBar, selectDB, tabelaPrecoSel, $state, listaItens, itensAdc) {

    $scope.qtdItens = 25;

    $scope.tabelas = selectDB.tabelaDePrecos();

    $scope.loadMore = function () {
        if ($scope.tabelas.length > $scope.qtdItens) {
            $scope.qtdItens += 25;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.selTabela = function (tbl) {

        if (tabelaPrecoSel.getTabelaPreco()[1] !== tbl[1]) {
            listaItens.resLista();
            itensAdc.resItens();
            itensAdc.delVlItens();
        }

        tabelaPrecoSel.setTabelaPreco(tbl);
        $state.go('persistt.pedidoNovo');
    };

    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: [],
            update: function (filteredItems, filterText) {
                $scope.pedidos = filteredItems;
            }
        });
    };
});

app.controller('PedidoNovoObservacaoController', function ($scope, $ionicSideMenuDelegate, $state, observacao) {
    $scope.campoObs = {
        obs: observacao.getObservacao()
    }

    $scope.criaObs = function (obs) {
        observacao.setObservacao($scope.campoObs.obs);
        $state.go('persistt.pedidoNovo');
    };
});

app.controller('PedidoNovoItemController', function ($scope, $ionicSideMenuDelegate, $ionicFilterBar, $state, $ionicModal, selectDB, itensAdc, tabelaPrecoSel, listaItens, toast, $ionicHistory) {

    $scope.tabela = tabelaPrecoSel.getTabelaPreco();

    if (listaItens.getLista().length > 0) {
        $scope.produtos = listaItens.getLista();
    } else {
        if ($scope.tabela.length > 1) {
            $scope.produtos = selectDB.produtosCTabelaPag($scope.tabela[1]);
        } else {
            $scope.produtos = selectDB.produtosCTabelaPag($scope.tabela);
        }
    }

    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.produtos,
            update: function (filteredItems, filterText) {
                $scope.produtos = filteredItems;
            }
        });
    };

    $scope.qtdItens = 25;

    $scope.loadMore = function () {
        if ($scope.produtos.length > $scope.qtdItens) {
            $scope.qtdItens += 25;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.prodSel = [];
    $scope.prodSelIndex = [];

    $scope.addProduto = function (prod, index) {
        $scope.prodSel = prod;
        $scope.prodSelIndex = index;
    }

    $scope.addItens = function () {
        $ionicHistory.goBack();
    }

    $scope.addQtd = function (qtd) {

        if (qtd === undefined || qtd === null || qtd === 0 || qtd === '') {
            console.log('essa quantidade não dá!');
            toast.makeToast("Quantidade inválida", "short", "bottom");
        } else {
            $scope.prodSel.push(qtd);
            $scope.prodSel.push(qtd * $scope.prodSel[4]);
            itensAdc.setItens($scope.prodSel);
            itensAdc.vlItens($scope.prodSel[4] * qtd);
            $scope.produtos.splice($scope.prodSelIndex, 1);
            listaItens.setLista($scope.produtos);
            $scope.closeModal();
        }
    }

    $ionicModal.fromTemplateUrl('./views/app/persistt-pedidos/pedido-modal-quantidade.html', {
        scope: $scope,
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show()
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

});