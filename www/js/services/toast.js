app.service('toast', function ($cordovaToast) {
    return {
        makeToast: function (mensagem, duracao, posicao) {
            $cordovaToast.show(mensagem, duracao, posicao).then(function (success) {
            }, function (error) {
                console.log("Erro toast: " + error);
            });
        }
    }
});