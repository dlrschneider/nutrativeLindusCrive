// Ionic Starter App

angular.module('underscore', [])
    .factory('_', function () {
        return window._; // assumes underscore has already been loaded on the page
    });

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('persistt', [
  'ionic',
  'angularMoment',
  'underscore',
  'ngResource',
  'ngCordova',
  'slugifier',
  'youtube-embed',
  'jett.ionic.filter.bar',
  'ngStorage',
  'ui.mask'
]);

app.run(function ($ionicPlatform, $rootScope, $ionicConfig, $timeout) {

    $ionicPlatform.on("deviceready", function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

    });

    // This fixes transitions for transparent background views
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (toState.name.indexOf('auth.walkthrough') > -1) {
            // set transitions to android to avoid weird visual effect in the walkthrough transitions
            $timeout(function () {
                $ionicConfig.views.transition('android');
                $ionicConfig.views.swipeBackEnabled(false);
                console.log("setting transition to android and disabling swipe back");
            }, 0);
        }
    });
    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        if (toState.name.indexOf('app.feeds-categories') > -1) {
            // Restore platform default transition. We are just hardcoding android transitions to auth views.
            $ionicConfig.views.transition('platform');
            // If it's ios, then enable swipe back again
            if (ionic.Platform.isIOS()) {
                $ionicConfig.views.swipeBackEnabled(true);
            }
            console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
        }
    });

});

app.config(function ($ionicConfigProvider, $ionicFilterBarConfigProvider, $httpProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-back').previousTitleText(false).text('');

    $ionicFilterBarConfigProvider.placeholder = function () {
        return "Procurar";
    }
});


app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider

        .state('auth', {
        url: "/auth",
        templateUrl: "views/auth/auth.html",
        abstract: true
    })

    .state('auth.ver', {
        url: '/ver',
        templateUrl: "views/auth/ver.html",
        controller: 'BlankController'
    })

    .state('auth.login', {
        url: '/login',
        templateUrl: "views/auth/login.html",
        controller: 'LoginController'
    })

    .state('menu', {
        url: "/menu",
        abstract: true,
        templateUrl: "views/side-menu.html",
        controller: 'SideMenuController'
    })

    .state('menu.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "views/home.html",
                controller: 'HomeController'
            }
        }
    })





    .state('persistt', {
        url: "/persistt",
        abstract: true,
        templateUrl: "views/app/side-menu.html",
        controller: 'SideMenuController'
    })

    .state('persistt.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "views/app/persistt-home.html",
                controller: 'HomeController'
            }
        }
    })

    //PEDIDOS
    .state('persistt.pedidos', {
            cache: false,
            url: '/pedidos',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-pedidos.html',
                    controller: 'PedidosController'
                }
            }
        })
        .state('persistt.pedidoDetalhes', {
            url: '/pedido',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-pedidos/pedido.html',
                    controller: 'PedidoDetalheController'
                }
            }
        })
        .state('persistt.pedidoNovo', {
            url: '/pedido-novo',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-pedidos/pedido-novo.html',
                    controller: 'PedidoNovoController'
                }
            }
        })
        .state('persistt.pedidoNovoClientes', {
            url: '/pedido-novo-clientes',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-pedidos/pedido-novo-cliente.html',
                    controller: 'PedidoNovoClienteController'
                }
            }
        })
        .state('persistt.pedidoNovoTabelaPreco', {
            url: '/pedido-novo-tabela-preco',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-pedidos/pedido-novo-tabela.html',
                    controller: 'PedidoNovoTabelaPrecoController'
                }
            }
        })
        .state('persistt.pedidoNovoObservacao', {
            url: '/pedido-novo-observacao',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-pedidos/pedido-novo-observacao.html',
                    controller: 'PedidoNovoObservacaoController'
                }
            }
        })
        .state('persistt.pedidoNovoItens', {
            url: '/pedido-novo-itens',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-pedidos/pedido-novo-item.html',
                    controller: 'PedidoNovoItemController'
                }
            }
        })

    //CLIENTES
    .state('persistt.clientes', {
            url: '/clientes',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-clientes.html',
                    controller: 'ClientesController'
                }
            }
        })
        .state('persistt.clienteDetalhes', {
            url: '/pedido-cliente',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-clientes/cliente-detalhes.html',
                    controller: 'ClienteDetalhesController'
                }
            }
        })
        .state('persistt.novaPessoaFisica', {
            url: '/pedido-nvpf',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-clientes/novaPessoaFisica.html',
                    controller: 'NovaPessoaFisicaController'
                }
            }
        })
        .state('persistt.novaPessoaJuridica', {
            url: '/pedido-nvpj',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/persistt-clientes/novaPessoaJuridica.html',
                    controller: 'NovaPessoaJuridicaController'
                }
            }
        })

    //PRODUTOS
    .state('persistt.produtos', {
        url: '/produtos',
        views: {
            'menuContent': {
                templateUrl: 'views/app/persistt-produtos.html',
                controller: 'ProdutosController'
            }
        }
    })

    //CONFIGURAÇÕES
    .state('persistt.configuracoes', {
        url: '/configuracoes',
        views: {
            'menuContent': {
                templateUrl: 'views/app/persistt-configuracoes.html',
                controller: 'ConfiguracoesController'
            }
        }
    })


    ;

    $urlRouterProvider.otherwise('/menu/home');
});