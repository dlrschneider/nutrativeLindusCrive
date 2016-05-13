app.service('selectDB', function ($localStorage, $ionicLoading, reqServer, infoLogin) {
    var db = openDatabase('persisttDB', '1.0', 'Persistt DataBase', 5 * 1024 * 1024);

    return {
        produtos: function () {
            var prods = [];

            db.transaction(function (t) {
                t.executeSql('SELECT dsDescricao, cdUnidadeDeMedida, idProduto FROM Produtos;', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);

                            var linha = [];
                            linha.push(r['dsDescricao']);
                            linha.push(r['cdUnidadeDeMedida']);
                            linha.push(r['idProduto']);

                            prods.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB() {
                console.log('erro no select produtos');
            };

            return prods;
        },

        clientes: function (coluna, filtro) {
            var clts = [];

            db.transaction(function (t) {

                if (coluna === undefined && filtro === undefined) {

                    t.executeSql('SELECT dsNomeFantasia, dsRazaoSocial, idCliente FROM clientes;', [],
                        function (t, result) {
                            for (var i = 0; i < result.rows.length; i++) {
                                var r = result.rows.item(i);

                                var linha = [];
                                linha.push(r['dsNomeFantasia']);
                                linha.push(r['dsRazaoSocial']);
                                linha.push(r['idCliente']);

                                clts.push(linha);
                            }
                        }, erroDB);

                } else {

                    t.executeSql('SELECT * FROM clientes WHERE ' + coluna + ' = ' + filtro + ';', [],
                        function (t, result) {
                            for (var i = 0; i < result.rows.length; i++) {
                                var r = result.rows.item(i);

                                var linha = [];
                                linha.push(r['idEmpresa']);
                                linha.push(r['idCliente']);
                                linha.push(r['cdCliente']);
                                linha.push(r['tpPessoa']);
                                linha.push(r['cdCnpj']);
                                linha.push(r['cdCpf']);
                                linha.push(r['cdInscricaoEstadual']);
                                linha.push(r['dsNomeFantasia']);
                                linha.push(r['dsRazaoSocial']);
                                linha.push(r['tpPersistencia']);
                                linha.push(r['dsObservacao']);
                                linha.push(r['dtUltimoUpdate']);

                                clts.push(linha);
                            }
                        }, erroDB);
                }
            });

            function erroDB() {
                console.log('erro no select clientes');
            };

            return clts;
        },

        telefones: function (coluna, filtro) {
            var tels = [];

            db.transaction(function (t) {
                t.executeSql('SELECT * FROM telefones WHERE ' + coluna + ' = ' + filtro + ';', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);

                            var linha = [];
                            linha.push(r['idCliente']);
                            linha.push(r['sqTelefone']);
                            linha.push(r['tpTelefone']);
                            linha.push(r['dsTelefone']);
                            linha.push(r['cdDDD']);
                            linha.push(r['dsNumero']);
                            linha.push(r['dtUltimoUpdate']);

                            tels.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB() {
                console.log('erro no select telefones');
            };

            return tels;

        },

        emails: function (coluna, filtro) {
            var emls = [];

            db.transaction(function (t) {
                t.executeSql('SELECT * FROM emails WHERE ' + coluna + ' = ' + filtro + ';', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);

                            var linha = [];
                            linha.push(r['idCliente']);
                            linha.push(r['sqEMail']);
                            linha.push(r['dsEMail']);
                            linha.push(r['dsEndEmail']);
                            linha.push(r['dtUltimoUpdate']);

                            emls.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB() {
                console.log('erro no select emails');
            };

            return emls;

        },

        enderecos: function (coluna, filtro) {
            var ends = [];

            db.transaction(function (t) {
                t.executeSql('SELECT * FROM enderecos E, cidades C WHERE E.' + coluna + ' = ' + filtro +
                    ' and E.cdIBGE = C.cdIBGE;', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);

                            var linha = [];
                            linha.push(r['idCliente']);
                            linha.push(r['sqEndereco']);
                            linha.push(r['cdCEP']);
                            linha.push(r['cdIBGE']);
                            linha.push(r['dsBairro']);
                            linha.push(r['dsComplemento']);
                            linha.push(r['dsEmail']);
                            linha.push(r['dsLogradouro']);
                            linha.push(r['dsNumero']);
                            linha.push(r['tpEndereco']);
                            linha.push(r['cdEstado']);
                            linha.push(r['dsNome']);
                            linha.push(r['dtUltimoUpdate']);

                            ends.push(linha);
                        }
                        
                    }, erroDB);
            });

            function erroDB() {
                console.log('erro no select enderecos');
            };

            return ends;

        },

        tabelaDePrecos: function () {
            var tbs = [];

            db.transaction(function (t) {
                t.executeSql('SELECT dsTabela, idTabelaPrecos, cdTabelaPreco FROM tabelaDePrecos;', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);

                            var linha = [];
                            linha.push(r['dsTabela']);
                            linha.push(r['idTabelaPrecos']);
                            linha.push(r['cdTabelaPreco']);

                            tbs.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB() {
                console.log('erro no select tabelaDePrecos');
            };

            return tbs;
        },

        prazo: function (id) {
            var prz = [];

            db.transaction(function (t) {
                t.executeSql('select * from CondicoesdePagamento A, CondicoesDaTabelaDePagamento B where A.idCondicaoPagamento = B.idCondicaoPagamento and B.idTabelaPrecos = ' + id + ';', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);

                            var linha = [];
                            linha.push(r['idCondicaoPagamento']);
                            linha.push(r['dsPrazo']);
                            prz.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB() {
                console.log('erro no select prazo');
            };

            return prz;
        },

        pedidos: function () {
            var peds = [];

            db.transaction(function (t) {
                t.executeSql('SELECT p.idPedido, p.dtEmissao, p.dsStatus, sum(i.qtProdutos * i.vlProduto) as vlTotal, c.dsNomeFantasia FROM Pedidos P, ItensDePedido I, Clientes C where p.idCliente = c.idCliente and p.idPedido = i.idPedido GROUP BY p.idPedido, p.dtEmissao, p.dsStatus, c.dsNomeFantasia ORDER BY p.idPedido DESC;', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);
                            
                            var linha = [];
                            linha.push(r['idPedido']);
                            linha.push(r['dtEmissao']);
                            linha.push(r['dsStatus']);
                            linha.push(r['vlTotal']);
                            linha.push(r['dsNomeFantasia']);
                            peds.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB() {
                console.log('erro no select pedidos');
            };

            return peds;
        },

        detalhesPedido: function (id) {
            var ped = [];
            
            db.transaction(function (t) {
                t.executeSql('SELECT p.idPedido, c.dsNomeFantasia, c.dsRazaoSocial, t.dsTabela, cp.dsPrazo, p.dsObservacao, p.dsStatus, c.idCliente, p.idTabelaPrecos, p.cdVendedor, cp.idCondicaoPagamento, p.dtEmissao FROM pedidos P, clientes C, tabelaDePrecos T, condicoesDePagamento CP WHERE p.idCliente = c.idCliente and p.idTabelaPrecos = t.idTabelaPrecos and p.idCondicaoPagamento = cp.idCondicaoPagamento and p.idPedido = '+id+';', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);
                            
                            var linha = [];
                            linha.push(r['idPedido']);
                            linha.push(r['dsNomeFantasia']);
                            linha.push(r['dsRazaoSocial']);
                            linha.push(r['dsTabela']);
                            linha.push(r['dsPrazo']);
                            linha.push(r['dsObservacao']);
                            linha.push(r['dsStatus']);
                            linha.push(r['idCliente']);
                            linha.push(r['idTabelaPrecos']);
                            linha.push(r['cdVendedor']);
                            linha.push(r['idCondicaoPagamento']);
                            linha.push(r['dtEmissao']);
                            ped.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB() {
                console.log('erro no select prazo');
            };

            return ped;
        },

        itensPedido: function (id) {
            var ped = [];
            
            db.transaction(function (t) {
                t.executeSql('SELECT i.idPedido, i.sqItemPedido, p.dsDescricao, p.cdUnidadeDeMedida, i.qtProdutos, i.vlProduto, i.idProduto FROM ItensDePedido I, Produtos P WHERE i.idProduto = p.idProduto and i.idPedido = '+id+';', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);
                            var tP = 0;
                            
                            var linha = [];
                            linha.push(r['idPedido']);
                            linha.push(r['sqItemPedido']);
                            linha.push(r['dsDescricao']);
                            linha.push(r['cdUnidadeDeMedida']);
                            linha.push(r['qtProdutos']);
                            linha.push(r['vlProduto']);
                            tP = r['qtProdutos'] * r['vlProduto'];
                            linha.push(tP);
                            linha.push(r['idProduto']);
                            ped.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB() {
                console.log('erro no select prazo');
            };

            return ped;
        },

        produtosCTabelaPag: function (tbP) {
            var prods = [];

            $ionicLoading.show({
                template: '<span style="position:relative;bottom:7px;"></span><ion-spinner icon="dots" style="fill: #bbb; stroke: #bbb;position:relative;bottom:-5px;"></ion-spinner>'
            });

            db.transaction(function (t) {
                t.executeSql('SELECT p.dsDescricao, p.cdUnidadeDeMedida, p.idProduto, p.cdReferencia, l.vlProduto FROM Produtos P, listaPrecos L where l.idProduto = p.idProduto and l.idTabelaPrecos = ' + tbP + ';', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);

                            var linha = [];
                            linha.push(r['dsDescricao']);
                            linha.push(r['cdUnidadeDeMedida']);
                            linha.push(r['idProduto']);
                            linha.push(r['cdReferencia']);
                            linha.push(r['vlProduto']);

                            prods.push(linha);
                        }
                        $ionicLoading.hide();
                    }, erroDB);

            });

            function erroDB() {
                console.log('erro no select produtosCTabelaPag');
                $ionicLoading.hide();
            };

            return prods;
        }
    }
});