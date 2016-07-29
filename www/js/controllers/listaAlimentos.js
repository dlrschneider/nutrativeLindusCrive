app.controller('ListaAlimentosController', function ($scope, $ionicFilterBar, $http, selectDB, $ionicModal, $ionicHistory, insertDB, tipoListaRegistroAlimento, datasService) {

    $scope.model = {};
    $scope.alimentos = selectDB.alimento();
    var ultimaDietaHistorico = selectDB.ultimaDietaHistorico();

    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.alimentos,
            update: function (filteredItems, filterText) {
                $scope.alimentos = filteredItems;
            }
        });
    };

    $scope.qtdItens = 25;

    $scope.loadMore = function () {
        if ($scope.alimentos.length > $scope.qtdItens) {
            $scope.qtdItens += 25;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.showFilterBar();

    $ionicModal.fromTemplateUrl('./views/modal-adicionaAlimento.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl('./views/modal-turnoAlimento.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalTurno = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show()
    };

    $scope.openModalTurno = function () {
        $scope.modalTurno.show()
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.closeModalTurno = function () {
        $scope.modalTurno.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
        $scope.modalTurno.remove();
    });

    $scope.selecionaAlimento = function (alimento) {
        $scope.model.nomeAlimento = alimento[2];
        $scope.openModalTurno();
    }

    $scope.setaTurno = function () {
        enviaAlimento();
        $scope.closeModalTurno();
    }

    $scope.adicionaAlimentoPorNome = function () {
        $scope.openModalTurno();
        $scope.closeModal();
    }

    enviaAlimento = function () {

        var dietaHistoricoAlimentacao = [];

        dietaHistoricoAlimentacao.push(ultimaDietaHistorico[0][0]);
        dietaHistoricoAlimentacao.push($scope.model.nomeAlimento);

        if (tipoListaRegistroAlimento.getTipo === 1) {
            dietaHistoricoAlimentacao.push(new Date().getTime());
        } else {
            dietaHistoricoAlimentacao.push(datasService.getDataAlimentacao().getTime());
        }
        dietaHistoricoAlimentacao.push($scope.model.turno);
        
        insertDB.dietaHistoricoAlimentacao(dietaHistoricoAlimentacao);
        console.log(dietaHistoricoAlimentacao);
        
        $http({
           url: 'http://localhost/nutrative/index.php/ws/app2site/historicoAlimentacao/',
           data: $.param({obj: dietaHistoricoAlimentacao}),
           method: 'POST',
           headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function (resp) {
           console.log(resp.data);
        });
        
        
        $ionicHistory.goBack();
    }


});