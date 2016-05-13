app.service('datasService', function () {
    
    var data = new Date();
    var dataAgenda = new Date();
    var dataMudaDataMiniCal = new Date();
    
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
        
        
        // set DataAgenda
        setDateDataAgenda: function (v) {
            dataAgenda.setDate(v);
        },
        setMonthDataAgenda: function (v) {
            dataAgenda.setMonth(v);
        },
        setFullYearDataAgenda: function (v) {
            dataAgenda.setFullYear(v);
        },
        
        
        // set DataMudaDataMiniCal
        setDateDataMudaDataMiniCal: function (v) {
            dataMudaDataMiniCal.setDate(v);
        },
        setMonthDataMudaDataMiniCal: function (v) {
            dataMudaDataMiniCal.setMonth(v);
        },
        setFullYearDataMudaDataMiniCal: function (v) {
            dataMudaDataMiniCal.setFullYear(v);
        }
    }
});