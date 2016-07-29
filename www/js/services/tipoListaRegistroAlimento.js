app.service('tipoListaRegistroAlimento', function () {
    /*
    *  Se o registro de alimentos é clicado pelo botão laranja encontrado na parte de baixo na lateral direita
    *  o tipo vai ser '1', o que significa que os alimentos registrados terão a data no dia atual
    *  caso o registro de alimentos seja aberto pela tela de alimentação no icone '+' na parte de cima na latera direita
    *  o tipo vai ser '2', o que significa que os alimentos registrados terão a data selecionada na tela de alimentação.
    *
    */
    
    var tipo = 1;
    
    return {
        setTipo : function(tp) {
            tipo = tp;
        },
        getTipo : function() {
            return tipo;
        }
    }
    
});