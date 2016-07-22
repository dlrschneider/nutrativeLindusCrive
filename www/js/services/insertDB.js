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
        
        alimento: function (args) {
            
            db.transaction(function (t) {
                t.executeSql('insert into alimento values (?, ?, ?, ?, ?, ?, ?);', args, OkDB, erroDB);
            });

            function erroDB(e) {
                return;
            };

            function OkDB(e) {
                return;
            };

            return;
        }, 
        
        dieta: function (args) {
            
            db.transaction(function (t) {
                t.executeSql('insert into dieta values (?, ?, ?, ?, ?);', args, OkDB, erroDB);
            });

            function erroDB(e) {
                return;
            };

            function OkDB(e) {
                return;
            };

            return;
        }, 
        
        dietaHistorico: function (args) {
            
            db.transaction(function (t) {
                t.executeSql('insert into dietaHistorico values (?, ?, ?, ?);', args, OkDB, erroDB);
            });

            function erroDB(e) {
                return;
            };

            function OkDB(e) {
                return;
            };

            return;
        },
        
        dietaHistoricoAlimentacao: function (args) {
            
            db.transaction(function (t) {
                t.executeSql('insert into historicoAlimentacao("idDietaHistorico", "alimento", "dataCadastro") values (?, ?, ?);', args, OkDB, erroDB);
            });

            function erroDB(e) {
                return;
            };

            function OkDB(e) {
                return;
            };

            return;
        },
        
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
        }
    }
});