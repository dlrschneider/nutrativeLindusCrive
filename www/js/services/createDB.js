app.service('createDB', function () {
    return {
        go: function () {
            var openDB = this.getOpenDB();

            if (openDB) {
                db = openDB('nutrativeDB', '1.0', 'Nutrative DataBase', 5 * 1024 * 1024); // 5MB
                db.transaction(function (t) {

                    t.executeSql('CREATE TABLE IF NOT EXISTS categoria (' +
                                    'idCategoria integer NOT NULL PRIMARY KEY,' +
                                    'nome text NOT NULL,' +
                                    'ativo text,' +
                                    'dataCadastro long NOT NULL' +
                                    ')');
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS alimento (' +
                                    'idalimento integer NOT NULL PRIMARY KEY,' +
                                    'idcategoria integer NOT NULL,' +
                                    'nome text NOT NULL,' +
                                    'carboidrato decimal(6,2) NOT NULL,' +
                                    'proteina decimal(6,2) NOT NULL,' +
                                    'lipidio decimal(6,2) NOT NULL,' +
                                    'dataCadastro long NOT NULL' +
                                    ')');

                    t.executeSql('CREATE TABLE IF NOT EXISTS dieta (' +
                                    'iddieta integer NOT NULL PRIMARY KEY,' +
                                    'idnutricionista integer NOT NULL,' +
                                    'caloria decimal(6,2),' +
                                    'ativo text, ' +
                                    'dataCadastro long NOT NULL' +
                                    ')');
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS dietaAlimento (' +
                                    'iddieta_alimento integer NOT NULL PRIMARY KEY,' +
                                    'iddieta integer NOT NULL,' +
                                    'idalimento integer NOT NULL,' +
                                    'dataCadastro long NOT NULL' +
                                    ')');
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS dietaHistorico (' +
                                    'iddieta_historico integer NOT NULL PRIMARY KEY,' +
                                    'iddieta integer NOT NULL,' +
                                    'idcliente integer NOT NULL,' +
                                    'dataCadastro long NOT NULL' +
                                    ')');
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS noticia (' +
                                    'idNoticia integer NOT NULL PRIMARY KEY,' + 
                                    'idNutricionista integer NOT NULL,' +
                                    'nomeNutricionista text NOT NULL,' +
                                    'tituloNoticia text NOT NULL,' +
                                    'descricaoNoticia text NOT NULL,' +
                                    'dataCadastro long NOT NULL' +
                                    ')');
                    
                    t.executeSql('CREATE TABLE IF NOT EXISTS historicoAlimentacao (' +
                                    'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
                                    'idAlimento integer NOT NULL,' +
                                    'quantidade integer NOT NULL,' +
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