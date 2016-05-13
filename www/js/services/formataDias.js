app.service('formataDias', function () {
    return {
        diasNoMes: function (month, year) {
            return new Date(year, month, 0).getDate();
        },

        diaDaSemana: function (month, year) {
            return new Date(year, month, 1).getDay();
        }
    }
});