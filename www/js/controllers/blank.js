app.controller('BlankController', function ($scope, $timeout, $state, infoLogin) {

    $timeout(function () {
        //if (infoLogin.getDsNm()) {
        //    $state.go('persistt.home');
        //} else {
            $state.go('auth.login');
        //}
    }, 500)

});