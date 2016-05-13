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
        }
    }
});