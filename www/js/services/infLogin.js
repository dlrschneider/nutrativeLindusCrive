app.service('infoLogin', function ($localStorage) {
    return {
        getUsu: function () {
            return $localStorage.usu;
        },
        setUsu: function (cod) {
            $localStorage.usu = cod;
        },
        delUsu: function () {
            delete $localStorage.usu;
        },
        
        getSen: function () {
            return $localStorage.sen;
        },
        setSen: function (cod) {
            $localStorage.sen = cod;
        },
        delSen: function () {
            delete $localStorage.sen;
        },
        
        getDsNm: function () {
            return $localStorage.nm;
        },
        setDsNm: function (ds) {
            $localStorage.nm = ds;
        },
        delDsNm: function () {
            delete $localStorage.nm;
        },
        
        getIdCliente: function () {
            return $localStorage.idCliente;
        },
        setIdCliente: function (ds) {
            $localStorage.idCliente = ds;
        },
        delIdCliente: function () {
            delete $localStorage.idCliente;
        },
        
        getIdNutricionista: function () {
            return $localStorage.idNutricionista;
        },
        setIdNutricionista: function (ds) {
            $localStorage.idNutricionista = ds;
        },
        delIdNutricionista: function () {
            delete $localStorage.idNutricionista;
        },
        
        getAltura: function () {
            return $localStorage.altura;
        },
        setAltura: function (ds) {
            $localStorage.altura = ds;
        },
        delAltura: function () {
            delete $localStorage.altura;
        },
        
        getPeso: function () {
            return $localStorage.peso;
        },
        setPeso: function (ds) {
            $localStorage.peso = ds;
        },
        delPeso: function () {
            delete $localStorage.peso;
        }
    }
});