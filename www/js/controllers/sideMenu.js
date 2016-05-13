app.controller('SideMenuController', function ($scope, $ionicSideMenuDelegate, $state, htmlFilter, datasService, $ionicLoading, reqServer, infoLogin, nomeMes, formataDias) {
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.nomeUsu = infoLogin.getDsNm();

    $scope.logout = function () {
        $ionicLoading.show({
            template: '<span style="position:relative;bottom:7px;"></span><ion-spinner icon="dots" style="fill: #bbb; stroke: #bbb;position:relative;bottom:-5px;"></ion-spinner>'
        });

        infoLogin.delDsNm();
        infoLogin.delUsu();
        infoLogin.delSen();
        $ionicLoading.hide();
    }

    $scope.alteraDataMiniCal = function (tp) {
        switch (tp) {
        case "aumentar":
            datasService.setDateDataMudaDataMiniCal(1);
            datasService.setMonthDataMudaDataMiniCal(datasService.getDataMudaDataMiniCal().getMonth() + 1);
            break;

        case "diminuir":
            datasService.setDateDataMudaDataMiniCal(1);
            datasService.setMonthDataMudaDataMiniCal(datasService.getDataMudaDataMiniCal().getMonth() - 1);
            break;
        }

        if (datasService.getDataMudaDataMiniCal().getMonth() == datasService.getData().getMonth()) {
            datasService.setDateDataMudaDataMiniCal(datasService.getData().getDate());
        }

        $scope.getDataMiniCal();

        renderizaCalendario(datasService.getDataMudaDataMiniCal());
    }

    $scope.getDataMiniCal = function () {
        $scope.dataMiniCal = nomeMes.getNomeMes(datasService.getDataMudaDataMiniCal().getMonth()) + " de " + datasService.getDataMudaDataMiniCal().getFullYear();
    }

    $scope.setaDataMiniCal = function () {
        var mesAgr = datasService.getData().getMonth();
        var anoAgr = datasService.getData().getFullYear();

        datasService.setMonthDataMudaDataMiniCal(mesAgr);
        datasService.setFullYearDataMudaDataMiniCal(anoAgr);

        $scope.dataMiniCal = nomeMes.getNomeMes(mesAgr) + " de " + anoAgr;

        renderizaCalendario(datasService.getData());
    }

    renderizaCalendario = function (qDT) {

        var diaComecoMes = formataDias.diaDaSemana(qDT.getMonth(), qDT.getFullYear());
        var diasMesAtual = formataDias.diasNoMes((qDT.getMonth() + 1), qDT.getFullYear());
        var diasMesPassado = formataDias.diasNoMes(qDT.getMonth(), qDT.getFullYear());

        var montaMiniCalendario = "";

        var a = diaComecoMes - 1;
        var b = diasMesAtual - 1;
        var c = 1;

        if (a == -1) {
            a = 6;
        }

        var diaDeHoje = datasService.getData().getDate();
        var mesAtual = datasService.getData().getMonth();
        var anoAtual = datasService.getData().getFullYear();

        var id = "";
        listaIdsMA = [];

        for (var i = 0; i < 42; i++) {
            if (i == 0 || i == 7 || i == 14 || i == 21 || i == 28 || i == 35) {
                montaMiniCalendario += "<tr>";
            }

            if (a != -1) {
                //id = miniCal_ANO_MÊS_DIA
                montaMiniCalendario += "<td id='";
                id += "miniCal_";
                if (qDT.getMonth() == 0) {
                    id += qDT.getFullYear() - 1;
                    id += "_";
                    id += 12;
                } else {
                    id += qDT.getFullYear();
                    id += "_";
                    id += qDT.getMonth() < 10 ? "0" + qDT.getMonth() : qDT.getMonth();
                }
                id += "_";
                id += (diasMesPassado - a) < 10 ? "0" + (diasMesPassado - a) : (diasMesPassado - a);
                montaMiniCalendario += id;
                montaMiniCalendario += "' class='";
                if (diaDeHoje == (diasMesPassado - a) && mesAtual == (qDT.getMonth() - 1) && anoAtual == qDT.getFullYear()) {
                    montaMiniCalendario += "miniCalendarioHoje'><div></div>";
                } else {
                    montaMiniCalendario += "miniCalendarioDiasSec'>";
                }
                montaMiniCalendario += diasMesPassado - a;
                listaIdsMA.push(id);
                id = "";
                a--;
            } else if (b != -1) {
                //id = miniCal_ANO_MÊS_DIA
                montaMiniCalendario += "<td id='";
                id += "miniCal_";
                id += qDT.getFullYear();
                id += "_";
                id += (qDT.getMonth() + 1) < 10 ? "0" + (qDT.getMonth() + 1) : (qDT.getMonth() + 1);
                id += "_";
                id += (diasMesAtual - b) < 10 ? "0" + (diasMesAtual - b) : (diasMesAtual - b);
                montaMiniCalendario += id;
                if (diaDeHoje == (diasMesAtual - b) && mesAtual == (qDT.getMonth()) && anoAtual == qDT.getFullYear()) {
                    montaMiniCalendario += "' class='miniCalendarioHoje'><div></div>";
                } else {
                    montaMiniCalendario += "'>";
                }
                montaMiniCalendario += diasMesAtual - b;
                listaIdsMA.push(id);
                id = "";
                b--;
            } else {
                //id = miniCal_ANO_MÊS_DIA
                montaMiniCalendario += "<td id='";
                id += "miniCal_";
                if (qDT.getMonth() + 2 == 13) {
                    id += qDT.getFullYear() + 1;
                    id += "_";
                    id += 1;
                } else {
                    id += qDT.getFullYear();
                    id += "_";
                    id += (qDT.getMonth() + 2) < 10 ? "0" + (qDT.getMonth() + 2) : (qDT.getMonth() + 2);
                }
                id += "_";
                id += c < 10 ? "0" + c : c;
                montaMiniCalendario += id;
                montaMiniCalendario += "' class='";
                if (diaDeHoje == c && mesAtual == (qDT.getMonth() + 1) && anoAtual == qDT.getFullYear()) {
                    montaMiniCalendario += "miniCalendarioHoje'><div></div>";
                } else {
                    montaMiniCalendario += "miniCalendarioDiasSec'>";
                }
                montaMiniCalendario += c;
                listaIdsMA.push(id);
                id = "";
                c++;
            }

            montaMiniCalendario += "</td>";

            if (i == 6 || i == 13 || i == 20 || i == 27 || i == 34 || i == 41) {
                montaMiniCalendario += "</tr>";
            }
        }

        $scope.corpoMiniCalendario = montaMiniCalendario;

    }

    $scope.setaDataMiniCal();

});