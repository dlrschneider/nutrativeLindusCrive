app.service('datasService', function () {
    
    var data = new Date();
    var dataAgenda = new Date();
    var dataMudaDataMiniCal = new Date();
    var dataAlimentacao = new Date();
    
    return {
        getData: function () {
            return data;
        },
        getDataAgenda: function () {
            return dataAgenda;
        },
        getDataMudaDataMiniCal: function () {
            return dataMudaDataMiniCal;
        },
        getDataAlimentacao: function (v) {
            return dataAlimentacao;
        },
        
        setDateDataAgenda: function (v) {
            dataAgenda.setDate(v);
        },
        setMonthDataAgenda: function (v) {
            dataAgenda.setMonth(v);
        },
        setFullYearDataAgenda: function (v) {
            dataAgenda.setFullYear(v);
        },
        
        setDateDataMudaDataMiniCal: function (v) {
            dataMudaDataMiniCal.setDate(v);
        },
        setMonthDataMudaDataMiniCal: function (v) {
            dataMudaDataMiniCal.setMonth(v);
        },
        setFullYearDataMudaDataMiniCal: function (v) {
            dataMudaDataMiniCal.setFullYear(v);
        },
        
        setDataAlimentacao: function (ano, mes, dia) {
            dataAlimentacao.setFullYear(ano);
            dataAlimentacao.setMonth(mes);
            dataAlimentacao.setDate(dia);
        },
        aumentaDataAlimentacao: function () {
            dataAlimentacao.setTime(dataAlimentacao.getTime() + 86400000);
        },
        diminuiDataAlimentacao: function () {
            dataAlimentacao.setTime(dataAlimentacao.getTime() - 86400000);
        }
        
        
    }
});