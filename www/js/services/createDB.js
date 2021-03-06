app.service('createDB', function () {
    return {
        go: function () {
            var openDB = this.getOpenDB();

            if (openDB) {
                db = openDB('nutrativeDB', '1.0', 'Nutrative DataBase', 5 * 1024 * 1024); // 5MB
                db.transaction(function (t) {
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS alimento (' +
                                    'idalimento integer NOT NULL PRIMARY KEY,' +
                                    'nome text NOT NULL,' +
                                    'carboidrato decimal(6,2) NOT NULL,' +
                                    'proteina decimal(6,2) NOT NULL,' +
                                    'lipidio decimal(6,2) NOT NULL,' +
                                    'ativo integer NOT NULL,' +
                                    'dataCadastro long NOT NULL' +
                                    ')');

                    t.executeSql('CREATE TABLE IF NOT EXISTS dieta (' +
                                    'iddieta integer NOT NULL PRIMARY KEY,' +
                                    'idnutricionista integer NOT NULL,' +
                                    'nome text NOT NULL,' +
                                    'ativo text NOT NULL, ' +
                                    'dataCadastro long NOT NULL' +
                                    ')');
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS dietaAlimento (' +
                                    'iddieta_alimento integer NOT NULL PRIMARY KEY,' +
                                    'iddieta integer NOT NULL,' +
                                    'idalimento integer NOT NULL,' +
                                    'turno text NOT NULL' +
                                    ')');
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS dietaHistorico (' +
                                    'iddieta_historico integer NOT NULL PRIMARY KEY,' +
                                    'iddieta integer NOT NULL,' +
                                    'idcliente integer NOT NULL,' +
                                    'dataCadastro long NOT NULL' +
                                    ')');
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS historicoAlimentacao (' +
                                    'idHistoricoAlimentacao INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
                                    'idDietaHistorico integer NOT NULL,' +
                                    'alimento text NOT NULL,' +
                                    'dataCadastro long NOT NULL,' +
                                    'turno text NOT NULL' +
                                    ')');
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS noticia (' +
                                    'idNoticia integer NOT NULL PRIMARY KEY,' + 
                                    'idNutricionista integer NOT NULL,' +
                                    'nomeNutricionista text NOT NULL,' +
                                    'tituloNoticia text NOT NULL,' +
                                    'descricaoNoticia text NOT NULL,' +
                                    'dataCadastro long NOT NULL' +
                                    ')');
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS anotacao (' +
                                    'idAnotacao integer NOT NULL PRIMARY KEY AUTOINCREMENT,' + 
                                    'idCliente integer NOT NULL,' +
                                    'descricao text NOT NULL,' +
                                    'dataCadastro long NOT NULL' +
                                    ')');
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