app.service('selectDB', function () {
    var db = openDatabase('nutrativeDB', '1.0', 'Nutrative DataBase', 5 * 1024 * 1024);
    
    return {
        noticia: function() {
            var resp = [];
            
            db.transaction(function (t) {
                t.executeSql('SELECT * FROM noticia;', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);

                            var linha = [];
                            linha.push(r['nomeNutricionista']);
                            linha.push(r['tituloNoticia']);
                            linha.push(r['descricaoNoticia']);
                            linha.push(r['dataCadastro']);

                            resp.push(linha);
        
                        }
                    }, erroDB);
            });

            function erroDB(e) {
                return;
            };

            return resp;
        },
        
        alimento: function() {
            var resp = [];
            
            db.transaction(function (t) {
                t.executeSql('SELECT * FROM alimento;', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);

                            var linha = [];
                            linha.push(r['idalimento']);
                            linha.push(r['idcategoria']);
                            linha.push(r['nome']);
                            linha.push(r['carboidrato']);
                            linha.push(r['proteina']);
                            linha.push(r['lipidio']);
                            linha.push(r['dataCadastro']);
                            
                            resp.push(linha);
        
                        }
                    }, erroDB);
            });

            function erroDB(e) {
                return;
            };

            return resp;
        },
        
        historicoAlimentacao: function(dataInicio, dataFim) {
            var resp = [];
            
            db.transaction(function (t) {
                t.executeSql('SELECT * FROM historicoAlimentacao where dataCadastro > '+dataInicio+' and dataCadastro < '+dataFim+';', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);

                            var dc = new Date(r['dataCadastro']);
                            var hora = dc.getHours() < 10 ? "0" + dc.getHours() : dc.getHours();
                            var minuto = dc.getMinutes() < 10 ? "0" + dc.getMinutes() : dc.getMinutes();
                            
                            var linha = [];
                            linha.push(r['alimento']);
                            linha.push(r['turno']);

                            resp.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB(e) {
                return;
            };

            return resp;
        },
        
        ultimaDietaHistorico: function() {
            var resp = [];
            
            db.transaction(function (t) {
                t.executeSql('SELECT *, max(dataCadastro) FROM dietaHistorico;', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);
                            
                            var linha = [];
                            linha.push(r['iddieta_historico']);
                            linha.push(r['iddieta']);
                            linha.push(r['idcliente']);
                            linha.push(r['dataCadastro']);

                            resp.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB(e) {
                return;
            };

            return resp;
        },
        
        dietaAlimento: function(turno) {
            var resp = [];
            
            db.transaction(function (t) {
                t.executeSql('select d.idDieta_alimento, d.idDieta, d.idAlimento, d.turno, a.nome from dietaAlimento D, alimento A where D.idAlimento = A.idAlimento and turno = "'+turno+'";', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);
                            
                            var linha = [];
                            linha.push(r['iddieta_alimento']);
                            linha.push(r['iddieta']);
                            linha.push(r['idalimento']);
                            linha.push(r['turno']);
                            linha.push(r['nome']);

                            resp.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB(e) {
                return;
            };

            return resp;
        },
        
        anotacao: function() {
            var resp = [];
            
            db.transaction(function (t) {
                t.executeSql('SELECT * FROM anotacao order by dataCadastro;', [],
                    function (t, result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var r = result.rows.item(i);
                            
                            var linha = [];
                            linha.push(r['idAnotacao']);
                            linha.push(r['idCliente']);
                            linha.push(r['descricao']);
                            linha.push(r['dataCadastro']);

                            resp.push(linha);
                        }
                    }, erroDB);
            });

            function erroDB(e) {
                return;
            };

            return resp;
        }
    }
});