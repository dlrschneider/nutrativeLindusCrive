app.controller('ClientesController', function ($scope, $ionicSideMenuDelegate, $ionicModal, $state, $ionicFilterBar, selectDB, idCliente) {

    $scope.$state = $state;

    $scope.qtdItens = 25;

    $scope.clientes = selectDB.clientes();

    $scope.loadMore = function () {
        if ($scope.clientes.length > $scope.qtdItens) {
            $scope.qtdItens += 25;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.selCliente = function (idC) {
        idCliente.setIdCliente(idC);
        $state.go('persistt.clienteDetalhes');
    }


    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.clientes,
            update: function (filteredItems, filterText) {
                $scope.clientes = filteredItems;
            }
        });
    };

    $ionicModal.fromTemplateUrl('./views/app/persistt-clientes/tipoCadastro-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show()
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

});

app.controller('ClienteDetalhesController', function ($scope, $ionicSideMenuDelegate, $timeout, selectDB, idCliente, cnpjFilter, cpfFilter, cepFilter) {

    $scope.clienteSel = selectDB.clientes('idCliente', idCliente.getIdCliente());
    $scope.TelClienteSel = selectDB.telefones('idCliente', idCliente.getIdCliente());
    $scope.EmlClienteSel = selectDB.emails('idCliente', idCliente.getIdCliente());
    $scope.EndClienteSel = selectDB.enderecos('idCliente', idCliente.getIdCliente());

    $timeout(function () {
        console.log($scope.EndClienteSel);
    }, 3000);
});

app.controller('NovaPessoaFisicaController', function ($scope, $ionicSideMenuDelegate, $ionicPopover, $ionicModal, $state, cepFilter, toast) {

    $scope.nvpf = {
        nome: '',
        cpf: '',
        obs: ''
    };
    $scope.telfs = [];
    $scope.emails = [];
    $scope.enderecos = [];

    $scope.addNvpf = function () {

        if ($scope.nvpf.nome.trim() === '') {
            console.log('tem que ter nome!!@!');
            toast.makeToast("Favor insira um nome", "short", "bottom");
        } else if ($scope.nvpf.cpf.trim() === '') {
            console.log('tem que ter cpf!');
            toast.makeToast("Favor insira o CPF", "short", "bottom");
        } else if (!$scope.telfs.length > 0) {
            console.log('pelo menos um telefone');
            toast.makeToast("Necessário um telefone de contato", "short", "bottom");
        } else if (!$scope.emails.length > 0) {
            console.log('pelo menos um email agr');
            toast.makeToast("Necessário um E-mail", "short", "bottom");
        } else if (!$scope.enderecos.length > 0) {
            console.log('poe um endereço aí');
            toast.makeToast("Necessário um endereço", "short", "bottom");
        } else {
            console.log($scope.nvpf);
            console.log($scope.telfs);
            console.log($scope.emails);
            console.log($scope.enderecos);
            $state.go('persistt.clientes');
        }
    }

    $ionicModal.fromTemplateUrl('./views/app/persistt-clientes/adicionarNumero-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalNumero = modal;

        $scope.tel = {
            tipo: '',
            descricao: '',
            numero: ''
        };

        $scope.tiposTelefones = [{
            valor: 1,
            desc: 'Comercial'
        }, {
            valor: 2,
            desc: 'Celular'
        }, {
            valor: 3,
            desc: 'Pessoal'
        }];

        $scope.tipoDefault = 1;
        $scope.tipoSelecionado = 1;

        $scope.mudaTipo = function (valor) {
            $scope.tipoSelecionado = valor;
        }

        $scope.addNro = function () {

            if ($scope.tel.descricao.trim() === '') {
                console.log('precisa de descrição');
                toast.makeToast("Favor insira uma descrição", "short", "bottom");
            } else if ($scope.tel.numero.trim() === '') {
                console.log('precisa de numero');
                toast.makeToast("Favor insira um número", "short", "bottom");
            } else {

                $scope.tel.tipo = $scope.tipoSelecionado;

                $scope.telfs.push($scope.tel);

                modal.hide();

                $scope.tel = {
                    tipo: '',
                    descricao: '',
                    numero: ''
                }
            }
        }
    });



    $ionicModal.fromTemplateUrl('./views/app/persistt-clientes/adicionarEmail-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalEmail = modal;

        $scope.em = {
            descricao: '',
            email: ''
        }

        $scope.addEml = function () {

            if ($scope.em.descricao.trim() === '') {
                console.log('precisa de descrição');
                toast.makeToast("Favor insira uma descrição", "short", "bottom");
            } else if ($scope.em.email.trim() === '') {
                console.log('precisa de um email');
                toast.makeToast("Favor insira um E-mail", "short", "bottom");
            } else {

                $scope.emails.push($scope.em);

                modal.hide();

                $scope.em = {
                    descricao: '',
                    email: ''
                }
            }
        }
    });



    $ionicModal.fromTemplateUrl('./views/app/persistt-clientes/adicionarEndereco-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalEndereco = modal;

        $scope.end = {
            tipo: '',
            cep: '',
            estado: '',
            cidade: '',
            bairro: '',
            numero: '',
            complemento: '',
            logradouro: ''
        }

        $scope.tiposEnderecos = [{
            valor: 1,
            desc: 'Endereço de Cobrança'
        }, {
            valor: 2,
            desc: 'Endereço de Entrega'
        }, {
            valor: 3,
            desc: 'Outros'
        }];

        $scope.tpDefault = 1;
        $scope.tpSelecionado = 1;

        $scope.mudaTipoEnd = function (valor) {
            $scope.tpSelecionado = valor;
        }

        $scope.addEnd = function () {

            if ($scope.end.cep.trim() === '') {
                console.log('precisa de cep');
                toast.makeToast("CEP obrigatório", "short", "bottom");
            } else if ($scope.end.estado.trim() === '') {
                console.log('precisa de estado');
                toast.makeToast("Estado obrigatório", "short", "bottom");
            } else if ($scope.end.cidade.trim() === '') {
                console.log('precisa de cidade');
                toast.makeToast("Cidade obrigatória", "short", "bottom");
            } else if ($scope.end.bairro.trim() === '') {
                console.log('precisa de bairro');
                toast.makeToast("Bairro obrigatório", "short", "bottom");
            } else if ($scope.end.numero === '') {
                console.log('precisa de numero');
                toast.makeToast("Número obrigatório", "short", "bottom");
            } else if ($scope.end.logradouro.trim() === '') {
                console.log('precisa de logradouro');
                toast.makeToast("Logradouro obrigatório", "short", "bottom");
            } else {

                $scope.end.tipo = $scope.tpSelecionado;
                $scope.enderecos.push($scope.end);

                modal.hide();

                $scope.end = {
                    cep: '',
                    estado: '',
                    cidade: '',
                    bairro: '',
                    numero: '',
                    complemento: '',
                    logradouro: ''
                }
            }
        }
    });


    $scope.$on('$destroy', function () {
        $scope.modalNumero.remove();
        $scope.modalEmail.remove();
        $scope.modalEndereco.remove();
    });

});

app.controller('NovaPessoaJuridicaController', function ($scope, $ionicSideMenuDelegate, $ionicPopover, $ionicModal, toast) {

    $scope.nvpj = {
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        inscricaoEstadual: '',
        obs: ''
    };
    $scope.telfs = [];
    $scope.emails = [];
    $scope.enderecos = [];

    $scope.addNvpj = function () {

        if ($scope.nvpj.razaoSocial.trim() === '') {
            console.log('tem que ter razaoSocial!!@!');
            toast.makeToast("Favor insira a razão social", "short", "bottom");
        } else if ($scope.nvpj.nomeFantasia.trim() === '') {
            console.log('tem que ter nomeFantasia!');
            toast.makeToast("Favor insira o nome fantasia", "short", "bottom");
        } else if ($scope.nvpj.cnpj.trim() === '') {
            console.log('tem que ter cnpj!');
            toast.makeToast("Favor insira o CNPJ", "short", "bottom");
        } else if ($scope.nvpj.inscricaoEstadual.trim() === '') {
            console.log('tem que ter inscricaoEstadual!');
            toast.makeToast("Favor insira a inscrição estadual", "short", "bottom");
        } else if (!$scope.telfs.length > 0) {
            console.log('pelo menos um telefone');
            toast.makeToast("Necessário um telefone de contato", "short", "bottom");
        } else if (!$scope.emails.length > 0) {
            console.log('pelo menos um email agr');
            toast.makeToast("Necessário um E-mail", "short", "bottom");
        } else if (!$scope.enderecos.length > 0) {
            console.log('poe um endereço aí');
            toast.makeToast("Necessário um endereço", "short", "bottom");
        } else {
            console.log($scope.nvpj);
            console.log($scope.telfs);
            console.log($scope.emails);
            console.log($scope.enderecos);
            $state.go('persistt.clientes');
        }
    }


    $ionicModal.fromTemplateUrl('./views/app/persistt-clientes/adicionarNumero-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalNumero = modal;

        $scope.tel = {
            tipo: '',
            descricao: '',
            numero: ''
        };

        $scope.tiposTelefones = [{
            valor: 1,
            desc: 'Comercial'
        }, {
            valor: 2,
            desc: 'Celular'
        }, {
            valor: 3,
            desc: 'Pessoal'
        }];

        $scope.tipoDefault = 1;
        $scope.tipoSelecionado = 1;

        $scope.mudaTipo = function (valor) {
            $scope.tipoSelecionado = valor;
        }

        $scope.addNro = function () {

            if ($scope.tel.descricao.trim() === '') {
                console.log('precisa de descrição');
                toast.makeToast("Favor insira uma descrição", "short", "bottom");
            } else if ($scope.tel.numero.trim() === '') {
                console.log('precisa de numero');
                toast.makeToast("Favor insira um número", "short", "bottom");
            } else {

                $scope.tel.tipo = $scope.tipoSelecionado;

                $scope.telfs.push($scope.tel);
                
                modal.hide();
                
                $scope.tel = {
                    tipo: '',
                    descricao: '',
                    numero: ''
                }
            }
        }
    });

    $ionicModal.fromTemplateUrl('./views/app/persistt-clientes/adicionarEmail-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalEmail = modal;

        $scope.em = {
            descricao: '',
            email: ''
        }

        $scope.addEml = function () {

            if ($scope.em.descricao.trim() === '') {
                console.log('precisa de descrição');
                toast.makeToast("Favor insira uma descrição", "short", "bottom");
            } else if ($scope.em.email.trim() === '') {
                console.log('precisa de um email');
                toast.makeToast("Favor insira um E-mail", "short", "bottom");
            } else {

                $scope.emails.push($scope.em);

                console.log($scope.emails);

                modal.hide();
                
                $scope.em = {
                    descricao: '',
                    email: ''
                }
            }
        }
    });

    $ionicModal.fromTemplateUrl('./views/app/persistt-clientes/adicionarEndereco-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalEndereco = modal;

        $scope.end = {
            tipo: '',
            cep: '',
            estado: '',
            cidade: '',
            bairro: '',
            numero: '',
            complemento: '',
            logradouro: ''
        }

        $scope.tiposEnderecos = [{
            valor: 1,
            desc: 'Endereço de Cobrança'
        }, {
            valor: 2,
            desc: 'Endereço de Entrega'
        }, {
            valor: 3,
            desc: 'Outros'
        }];

        $scope.tpDefault = 1;
        $scope.tpSelecionado = 1;

        $scope.mudaTipoEnd = function (valor) {
            $scope.tpSelecionado = valor;
        }

        $scope.addEnd = function () {


            if ($scope.end.cep.trim() === '') {
                console.log('precisa de cep');
                toast.makeToast("CEP obrigatório", "short", "bottom");
            } else if ($scope.end.estado.trim() === '') {
                console.log('precisa de estado');
                toast.makeToast("Estado obrigatório", "short", "bottom");
            } else if ($scope.end.cidade.trim() === '') {
                console.log('precisa de cidade');
                toast.makeToast("Cidade obrigatória", "short", "bottom");
            } else if ($scope.end.bairro.trim() === '') {
                console.log('precisa de bairro');
                toast.makeToast("Bairro obrigatório", "short", "bottom");
            } else if ($scope.end.numero === '') {
                console.log('precisa de numero');
                toast.makeToast("Número obrigatório", "short", "bottom");
            } else if ($scope.end.logradouro.trim() === '') {
                console.log('precisa de logradouro');
                toast.makeToast("Logradouro obrigatório", "short", "bottom");
            } else {

                $scope.end.tipo = $scope.tpSelecionado;
                $scope.enderecos.push($scope.end);
                
                modal.hide();
                
                $scope.end = {
                    cep: '',
                    estado: '',
                    cidade: '',
                    bairro: '',
                    numero: '',
                    complemento: '',
                    logradouro: ''
                }
            }
        }
    });


    $scope.$on('$destroy', function () {
        $scope.modalNumero.remove();
        $scope.modalEmail.remove();
        $scope.modalEndereco.remove();
    });
});