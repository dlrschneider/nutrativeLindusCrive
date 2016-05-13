app.factory('reqServer', function ($http, infoLogin) {
    var resposta = {


        LOGIN: function () {

            var dados = {
                tpTransacao: 1,
                org: 5,
                p1: infoLogin.getUsu(),
                p2: infoLogin.getSen()
            }

            var r = resposta.comunicaServidor(dados).then(function (resp) {
                return resp;
            });

            return r;
        },


        LOGOUT: function (ns) {

            var dados = {
                tpTransacao: 2,
                ids: ns
            }

            var r = resposta.comunicaServidor(dados).then(function (resp) {
                return resp;
            });

            return r;
        },


        REGISTRO_CLIENTE: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 3,
                    ids: l.data.result.ns,
                    cdC: 'cdCliente',
                    dsRS: 'dsRazaoSocial',
                    dsNF: 'dsNomeFantasia',
                    tpP: 'tpPessoa',
                    cdCJ: 'cdCNPJ',
                    cdCF: 'cdCPF',
                    cdIE: 'cdInscricaoEstadual',
                    tpPer: 'tpPersistencia',
                    dsObs: 'dsObservacao',
                    ends: 'enderecos[getJSONObject]',
                    tels: 'telefones[getJSONObject]',
                    mails: 'emails[getJSONObject]'

                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;

        },


        REGISTRO_CIDADE: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 4,
                    ids: l.data.result.ns,
                    qtd: 'qtCidades[int]',
                    lista: 'todas[JSONArray]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        MOBILE: function () {

            var dados = {
                tpTransacao: 5
            }

            return dados;
        },


        MOBILE_SOL_CLIENTE: function (hrus) {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 6,
                    ids: l.data.result.ns,
                    hus: hrus //'horaUltimaSincronizacao[long]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        REGISTRO_UNIDADES_DE_MEDIDA: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 7,
                    ids: l.data.result.ns,
                    qtd: 'qtUnidades[int]',
                    lista: 'todas[JSONArray]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        REGISTRO_DE_PRODUTOS: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 8,
                    ids: l.data.result.ns,
                    qtd: 'qtProdutos[int]',
                    lista: 'todos[JSONArray]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        REGISTRO_UNIDADES_DE_MEDIDA_DOS_PRODUTOS: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 9,
                    ids: l.data.result.ns,
                    qtd: 'qtUnidades[int]',
                    lista: 'todas[JSONArray]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        REGISTRO_DE_CONDICOES_DE_PAGAMENTO: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 10,
                    ids: l.data.result.ns,
                    qtd: 'qtCondicoes[int]',
                    lista: 'todas[JSONArray]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        REGISTRO_DE_VENDEDORES: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 11,
                    ids: l.data.result.ns,
                    qtd: 'qtVendedores[int]',
                    lista: 'todos[JSONArray]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        REGISTRO_DE_VENDEDORES_DOS_CLIENTES: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 12,
                    ids: l.data.result.ns,
                    qtd: 'qtVendedores[int]',
                    lista: 'todos[JSONArray]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        REGISTRO_DE_LISTA_DE_PRECOS: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 13,
                    ids: l.data.result.ns,
                    qtd: 'qtdListas[int]',
                    lista: 'todas[JSONArray]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        REGISTRO_DE_CONDICOES_DAS_TABELAS: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 14,
                    ids: l.data.result.ns,
                    qtd: 'qtdListas[int]',
                    lista: 'todas[JSONArray]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        MOBILE_SOL_PRODUTOS: function (hrus) {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 15,
                    ids: l.data.result.ns,
                    hus: hrus //'horaUltimaSincronizacao[long]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        MOBILE_SOL_COMPLEMENTO_PRODUTOS: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 16,
                    ids: l.data.result.ns,
                    hus: 'dtUltimoUpdate[string(dd/MM/yyyy hh:mm:ss)]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        MOBILE_ENVIA_PEDIDOS: function (pedidos) {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 17,
                    ids: l.data.result.ns,
                    pedidos: pedidos
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});
                    
                    console.log(resp);
                    
                    return resp;
                });

                return r;

            });

            return promise;
        },


        SOLICITA_PEDIDOS: function () {
            
            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 18,
                    ids: l.data.result.ns,
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        REGISTRO_DE_TABELAS_DE_PRECOS: function () {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 19,
                    ids: l.data.result.ns,
                    qtd: 'qtUnidades[int]',
                    lista: 'todas[JSONArray]'
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        MOBILE_SOL_TABELA_DE_PRECOS: function (hrus) {

            var promise = this.LOGIN().then(function (l) {

                var dados = {
                    tpTransacao: 20,
                    ids: l.data.result.ns,
                    hus: hrus
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        MOBILE_SOL_LISTA_PRECOS: function (dtL, nrRg, mxRg) {

            var promise = this.LOGIN().then(function (l) {

                var dtF = new Date(dtL);

                var mes = dtF.getMonth();
                var dia = dtF.getDate();
                var ano = dtF.getFullYear();
                var hora = dtF.getHours();
                var minuto = dtF.getMinutes();
                var segundo = dtF.getSeconds();

                mes = mes + 1;
                mes = mes + "";
                if (mes.length == 1) {
                    mes = "0" + mes;
                }
                dia = dia + "";
                if (dia.length == 1) {
                    dia = "0" + dia;
                }
                hora = hora + "";
                if (hora.length < 2) {
                    hora = "0" + hora;
                }
                minuto = minuto + "";
                if (minuto.length < 2) {
                    minuto = "0" + minuto;
                }
                segundo = segundo + "";
                if (segundo.length) {
                    segundo = "0" + segundo;
                }

                var hrus = ano + mes + dia + hora + minuto + segundo;

                var dados = {
                    tpTransacao: 21,
                    ids: l.data.result.ns,
                    hus: hrus,
                    nrg: nrRg,
                    max: mxRg
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },


        MOBILE_SOL_CONDICOES_DE_PAGAMENTO: function (dtL) {

            var promise = this.LOGIN().then(function (l) {

                var dtF = new Date(dtL);

                var mes = dtF.getMonth();
                var dia = dtF.getDate();
                var ano = dtF.getFullYear();
                var hora = dtF.getHours();
                var minuto = dtF.getMinutes();
                var segundo = dtF.getSeconds();

                mes = mes + 1;
                mes = mes + "";
                if (mes.length == 1) {
                    mes = "0" + mes;
                }
                dia = dia + "";
                if (dia.length == 1) {
                    dia = "0" + dia;
                }
                hora = hora + "";
                if (hora.length < 2) {
                    hora = "0" + hora;
                }
                minuto = minuto + "";
                if (minuto.length < 2) {
                    minuto = "0" + minuto;
                }
                segundo = segundo + "";
                if (segundo.length) {
                    segundo = "0" + segundo;
                }

                var hrus = ano + mes + dia + hora + minuto + segundo;

                var dados = {
                    tpTransacao: 22,
                    ids: l.data.result.ns,
                    hus: hrus
                }

                var r = resposta.comunicaServidor(dados).then(function (resp) {
                    resposta.LOGOUT(l.data.result.ns).then(function (o) {});

                    return resp;
                });

                return r;

            });

            return promise;
        },

        MOBILE_REGISTRA_DISPOSITIVO: function (usuario, senha) {

            var dados = {
                tpTransacao: 23,
                p1: usuario,
                p2: senha
            }

            var r = resposta.comunicaServidor(dados).then(function (resp) {
                return resp;
            });

            return r;

        },


        MOBILE_LOGIN: function () {

            var dados = {
                tpTransacao: 99
            }

            return dados;
        },


        comunicaServidor: function (dados) {

//            var promise = $http.post('http://192.168.0.150:8090/persisttWEB/Comm', dados).then(function (resp) {
            var promise = $http.post('http://191.252.65.178/Persist/Comm', dados).then(function (resp) {
//            var promise = $http.post('http://localhost:8090/persisttWEB/Comm', dados, {
//                header: {
//                    'Content-Type': 'application/json; charset=utf-8'
//                }
//            }).then(function (resp) {

                return resp;

            });

            return promise;

        }



    };

    return resposta;
});