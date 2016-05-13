app.service('nomeMes', function () {
    return {
        getNomeMes: function (m) {

            switch (m) {
            case 0:
                nomeMes = "Janeiro";
                break;
            case 1:
                nomeMes = "Fevereiro";
                break;
            case 2:
                nomeMes = "Março";
                break;
            case 3:
                nomeMes = "Abril";
                break;
            case 4:
                nomeMes = "Maio";
                break;
            case 5:
                nomeMes = "Junho";
                break;
            case 6:
                nomeMes = "Julho";
                break;
            case 7:
                nomeMes = "Agosto";
                break;
            case 8:
                nomeMes = "Setembro";
                break;
            case 9:
                nomeMes = "Outubro";
                break;
            case 10:
                nomeMes = "Novembro";
                break;
            case 11:
                nomeMes = "Dezembro";
                break;
            }
            
            return nomeMes;
        }
    }
});