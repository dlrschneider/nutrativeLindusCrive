app.service('listaProdutos', function (selectDB) {
    var lsProdutos = [];
    
    return {
        getListaProdutos: function () {
            
            if(!lsProdutos.length > 0) {
                lsProdutos = selectDB.produtos();
            }
            
            return lsProdutos;
        },
        deleteListaProdutos: function () {
            lsProdutos =[];
        }
    }
});