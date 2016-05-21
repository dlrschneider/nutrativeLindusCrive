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
        }
    }
});