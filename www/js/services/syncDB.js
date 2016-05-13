app.service('syncDB', function ($localStorage, reqServer, infoLogin, $ionicLoading, quantidadeTab) {
    return {
        go: function () {
            var db = this.database();
            
            var d = new Date();
            var n = d.getTime();

            var ins = 0;

            $ionicLoading.show({
                template: '<span style="position:relative;bottom:7px;">Sincronizando</span><ion-spinner icon="dots" style="fill: #bbb; stroke: #bbb;position:relative;bottom:-5px;"></ion-spinner>'
            });

            if (!$localStorage.hus) {
                $localStorage.hus = 1;
            }
            
            if(!$localStorage.qtdProdutos) {
                $localStorage.qtdProdutos = 0;
            }
            if(!$localStorage.qtdClientes) {
                $localStorage.qtdClientes = 0;
            }
            if(!$localStorage.qtdPedidos) {
                $localStorage.qtdPedidos = 0;
            }
            
            var hus = $localStorage.hus;

            reqServer.MOBILE_SOL_CLIENTE(hus).then(function (resp) {

                if (resp.data.result) {
                    db.transaction(function (t) {


                        if (resp.data.result.cdds.length > 0) {
                            console.log('adicionando cidades no DB');

                            for (var i = 0; i < resp.data.result.cdds.length; i++) {
                                var args = resp.data.result.cdds[i];
                                args.push(n);
                                ins++;
                                t.executeSql('INSERT INTO cidades VALUES (?, ?, ?, ?, ?);', args, sucessoDB, erroDB);
                            }
                        }

                        if (resp.data.result.clts.length > 0) {
                            console.log('adicionando clientes no DB');
                            for (var i = 0; i < resp.data.result.clts.length; i++) {
                                var args = resp.data.result.clts[i];
                                var idCliente = args[1];

                                for (var e = 0; e < args[11].length; e++) {
                                    var endereco = args[11];
                                    endereco[e].unshift(idCliente);
                                    endereco[e].push(n);
                                    ins++;
                                    t.executeSql('INSERT INTO enderecos VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', endereco[e], sucessoDB, erroDB);
                                }

                                for (var em = 0; em < args[12].length; em++) {
                                    var email = args[12];
                                    email[em].unshift(idCliente);
                                    email[em].push(n);
                                    ins++;
                                    t.executeSql('INSERT INTO emails VALUES (?, ?, ?, ?, ?);', email[em], sucessoDB, erroDB);
                                }

                                for (var tel = 0; tel < args[13].length; tel++) {
                                    var telefone = args[13];
                                    telefone[tel].unshift(idCliente);
                                    telefone[tel].push(n);
                                    ins++;
                                    t.executeSql('INSERT INTO telefones VALUES (?, ?, ?, ?, ?, ?, ?);', telefone[tel], sucessoDB, erroDB);
                                }

                                for (var a = 0; a < 3; a++) {
                                    args.pop();
                                }

                                args.push(n);
                                ins++;
                                t.executeSql('INSERT INTO clientes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', args, sucessoDB, erroDB);
                                quantidadeTab.somaCliente();
                            }
                        }

                        if (resp.data.result.emprs.length > 0) {
                            console.log('adicionando empresas no DB');
                            for (var i = 0; i < resp.data.result.emprs.length; i++) {
                                var args = resp.data.result.emprs[i];
                                args.push(n);
                                ins++;
                                t.executeSql('INSERT INTO empresas VALUES (?, ?, ?, ?, ?);', args, sucessoDB, erroDB);
                            }
                        }
                    });
                }
            });




            reqServer.MOBILE_SOL_PRODUTOS(hus).then(function (resp) {

                if (resp.data.result) {
                    db.transaction(function (t) {

                        if (resp.data.result.prods.length > 0) {
                            console.log('adicionando produtos no DB');
                            for (var i = 0; i < resp.data.result.prods.length; i++) {
                                var args = resp.data.result.prods[i];
                                args.shift();
                                args.push(n);
                                ins++;
                                t.executeSql('INSERT INTO Produtos VALUES (?, ?, ?, ?, ?);', args, sucessoDB, erroDB);
                                quantidadeTab.somaProduto();
                            }
                        }

                        if (resp.data.result.unids.length > 0) {
                            console.log('adicionando unidades no DB');
                            for (var i = 0; i < resp.data.result.unids.length; i++) {
                                var args = resp.data.result.unids[i];
                                args.push(n);
                                ins++;
                                t.executeSql('INSERT INTO UnidadesDeMedida VALUES (?, ?, ?, ?);', args, sucessoDB, erroDB);
                            }
                        }

                        $ionicLoading.hide();
                    });
                }
            });

            
            
            reqServer.MOBILE_SOL_TABELA_DE_PRECOS(hus).then(function (resp) {

                if (resp.data.result) {
                    db.transaction(function (t) {

                        if (resp.data.result.tbPrcs.length > 0) {
                            console.log('adicionando tabelas de preço no DB');
                            for (var i = 0; i < resp.data.result.tbPrcs.length; i++) {
                                var args = resp.data.result.tbPrcs[i];
                                args.push(n);
                                ins++;
                                t.executeSql('INSERT INTO tabelaDePrecos VALUES (?, ?, ?, ?, ?, ?);', args, sucessoDB, erroDB);
                            }
                        }
                    });
                }
            });

            reqServer.MOBILE_SOL_CONDICOES_DE_PAGAMENTO(hus).then(function (resp) {

                if (resp.data.result) {
                    db.transaction(function (t) {

                        if (resp.data.result.lstCnds.length > 0) {
                            for (var i = 0; i < resp.data.result.lstCnds.length; i++) {
                                var args = resp.data.result.lstCnds[i];
                                var ctabelaPag = resp.data.result.lstCnds[i][3];
                                args.pop();
                                args.push(n);

                                if (ctabelaPag.length > 0) {
                                    for (var p = 0; p < ctabelaPag.length; p++) {
                                        var args2 = [];
                                        args2.push(args[0]);
                                        args2.push(ctabelaPag[p]);
                                        args2.push(n);

                                        t.executeSql('INSERT INTO condicoesDaTabelaDePagamento VALUES (?, ?, ?);', args2, sucessoDB, erroDB);
                                    }
                                }

                                t.executeSql('INSERT INTO condicoesDePagamento VALUES (?, ?, ?, ?);', args, sucessoDB, erroDB);
                            }
                        }
                    });
                }
            });

            function reqListaPrecos(pNrReg, pMaxReg) {
                
                var nrReg = pNrReg;
                var maxReg = pMaxReg;
                reqServer.MOBILE_SOL_LISTA_PRECOS(hus, nrReg, maxReg).then(function (resp) {
                    if (resp.data.result) {

                        db.transaction(function (t) {

                            if (resp.data.result.lstPrcs.length > 0) {
                                for (var i = 0; i < resp.data.result.lstPrcs.length; i++) {
                                    var args = resp.data.result.lstPrcs[i];
                                    args.push(n);
                                    
                                    t.executeSql('INSERT INTO listaPrecos VALUES (?, ?, ?, ?);', args, sucessoDB, erroDB);
                                }
                            }
                            
                            if (resp.data.result.qtr == maxReg) {
                                nrReg += maxReg;
                                reqListaPrecos(nrReg, pMaxReg);
                            }
                        });
                    }
                });
            }

            reqListaPrecos(0, 737);



            function sucessoDB() {
                console.log("sucesso");
            }

            function erroDB() {
                console.log("erro");
            }

            $localStorage.hus = n;
            return;
        },

        database: function () {
            var openDB = this.getOpenDB();

            if (openDB) {
                db = openDB('persisttDB', '1.0', 'Persistt DataBase', 5 * 1024 * 1024); // 5MB
                db.transaction(function (t) {

                    t.executeSql('CREATE TABLE IF NOT EXISTS cidades(' +
                        'cdIBGE TEXT NOT NULL PRIMARY KEY,' +
                        'cdEstado TEXT NOT NULL,' +
                        'dsNome TEXT NOT NULL,' +
                        'idCidade INT NOT NULL,' +
                        'dtUltimoUpdate INT NOT NULL' +
                        ');');

                    t.executeSql('CREATE TABLE IF NOT EXISTS clientes(' +
                        'idEmpresa INT,' +
                        'idCliente INT NOT NULL,' +
                        'cdCliente TEXT,' +
                        'tpPessoa TEXT,' +
                        'cdCnpj TEXT,' +
                        'cdCpf TEXT,' +
                        'cdInscricaoEstadual TEXT,' +
                        'dsNomeFantasia TEXT,' +
                        'dsRazaoSocial TEXT,' +
                        'tpPersistencia TEXT,' +
                        'dsObservacao TEXT,' +
                        'dtUltimoUpdate INT NOT NULL,' +
                        'PRIMARY KEY (idCliente, idEmpresa) );');

                    t.executeSql('CREATE TABLE IF NOT EXISTS enderecos(' +
                        'idCliente INT,' +
                        'sqEndereco INT,' +
                        'cdCEP TEXT,' +
                        'cdIBGE TEXT,' +
                        'dsBairro TEXT,' +
                        'dsComplemento TEXT,' +
                        'dsEmail TEXT,' +
                        'dsLogradouro TEXT,' +
                        'dsNumero TEXT,' +
                        'tpEndereco TEXT,' +
                        'dtUltimoUpdate INT,' +
                        'PRIMARY KEY (idCliente, sqEndereco) );');

                    t.executeSql('CREATE TABLE IF NOT EXISTS emails(' +
                        'idCliente INT,' +
                        'sqEMail INT,' +
                        'dsEMail TEXT,' +
                        'dsEndEmail TEXT,' +
                        'dtUltimoUpdate INT,' +
                        'PRIMARY KEY (idCliente, sqEMail) );');

                    t.executeSql('CREATE TABLE IF NOT EXISTS telefones(' +
                        'idCliente INT,' +
                        'sqTelefone INT,' +
                        'tpTelefone TEXT,' +
                        'dsTelefone TEXT,' +
                        'cdDDD TEXT,' +
                        'dsNumero TEXT,' +
                        'dtUltimoUpdate INT,' +
                        'PRIMARY KEY (idCliente, sqTelefone) );');

                    t.executeSql('CREATE TABLE IF NOT EXISTS empresas(' +
                        'idEmpresa INT,' +
                        'cdEmpresa TEXT,' +
                        'cdFilial TEXT,' +
                        'dsRazaoSocial TEXT,' +
                        'dtUltimoUpdate INT' +
                        ');');

                    t.executeSql('CREATE TABLE IF NOT EXISTS UnidadesDeMedida(' +
                        'cdUnidadeDeMedida TEXT,' +
                        'dsUnidadeDeMedida TEXT,' +
                        'idUnidadeDeMedida INT,' +
                        'dtUltimoUpdate INT' +
                        ');');

                    t.executeSql('CREATE TABLE IF NOT EXISTS Produtos(' +
                        'idProduto INT,' +
                        'cdReferencia TEXT,' +
                        'cdUnidadeDeMedida TEXT,' +
                        'dsDescricao TEXT,' +
                        'dtUltimoUpdate INT' +
                        ');');

                    t.executeSql('CREATE TABLE IF NOT EXISTS tabelaDePrecos(' +
                        'idTabelaPrecos INT NOT NULL PRIMARY KEY,' +
                        'cdTabelaPreco TEXT,' +
                        'dsTabela TEXT,' +
                        'dtInicioValidade TEXT,' +
                        'dtFimValidade TEXT,' +
                        'dtUltimoUpdate INT' +
                        ');');

                    t.executeSql('CREATE TABLE IF NOT EXISTS vendedor(' +
                        'idVendedor INT NOT NULL PRIMARY KEY,' +
                        'dsNome TEXT,' +
                        'cdVendedor TEXT,' +
                        'idEmpresa INT,' +
                        'dtUltimoUpdate INT' +
                        ');');

                    t.executeSql('CREATE TABLE IF NOT EXISTS listaPrecos(' +
                        'idProduto INT NOT NULL,' +
                        'idTabelaPrecos INT NOT NULL,' +
                        'vlProduto REAL,' +
                        'dtUltimoUpdate INT,' +
                        'PRIMARY KEY (idProduto, idTabelaPrecos) );');

                    t.executeSql('CREATE TABLE IF NOT EXISTS condicoesDePagamento(' +
                        'idCondicaoPagamento INT NOT NULL PRIMARY KEY,' +
                        'cdCodicaoPagamento TEXT,' +
                        'dsPrazo TEXT,' +
                        'dtUltimoUpdate INT' +
                        ');');

                    t.executeSql('CREATE TABLE IF NOT EXISTS condicoesDaTabelaDePagamento(' +
                        'idCondicaoPagamento INT NOT NULL,' +
                        'idTabelaPrecos INT NOT NULL,' +
                        'dtUltimoUpdate INT,' +
                        'PRIMARY KEY (idCondicaoPagamento, idTabelaPrecos) );');

                    t.executeSql('CREATE TABLE IF NOT EXISTS pedidos(' +
                        'idPedido INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
                        'idCliente INT NOT NULL,' +
                        'dtEmissao INT,' +
                        'idTabelaPrecos INT,' +
                        'idCondicaoPagamento INT,' +
                        'cdVendedor TEXT,' +
                        'dsObservacao TEXT,' +
                        'dsStatus TEXT,' +
                        'dtUltimoUpdate INT' +
                        ');');
                        
                    t.executeSql('CREATE TABLE IF NOT EXISTS itensDePedido(' +
                        'idPedido INT NOT NULL,' +
                        'sqItemPedido INT NOT NULL,' +
                        'idProduto INT,' +
                        'qtProdutos REAL,' +
                        'vlProduto REAL,' +
                        'dtUltimoUpdate INT,' +
                        'PRIMARY KEY (idPedido, sqItemPedido) );');
                });

                return db;
            }
        },
        
        getOpenDB: function () {
            try {
                if (window.openDatabase) {
                    return window.openDatabase;
                } else {
                    alert('No HTML5 support');
                    return undefined;
                }
            } catch (e) {
                alert(e);
                return undefined;
            }
        }
    }
});