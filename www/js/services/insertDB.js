app.service('insertDB', function () {
    var db = openDatabase('nutrativeDB', '1.0', 'Nutrative DataBase', 5 * 1024 * 1024);

    return {
        noticia: function (args) {
            
            db.transaction(function (t) {
                t.executeSql('insert into noticia values (?, ?, ?, ?, ?, ?);', args, OkDB, erroDB);
            });

            function erroDB(e) {
                return;
            };

            function OkDB(e) {
                return;
            };

            return;
        }, 
        
        historicoAlimentacao: function (args) {
            
            db.transaction(function (t) {
                t.executeSql('insert into historicoAlimentacao ("idAlimento", "quantidade", "dataCadastro") values (?, ?, ?);', args, OkDB, erroDB);
            });

            function erroDB(e) {
                return;
            };

            function OkDB(e) {
                return;
            };

            return;
        }
    }
});