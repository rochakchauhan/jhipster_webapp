(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('oauth-client', {
            parent: 'entity',
            url: '/oauth-client',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_client.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-client/oauth-clients.html',
                    controller: 'Oauth_clientController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_client');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('oauth-client-detail', {
            parent: 'entity',
            url: '/oauth-client/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_client.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-client/oauth-client-detail.html',
                    controller: 'Oauth_clientDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_client');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Oauth_client', function($stateParams, Oauth_client) {
                    return Oauth_client.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('oauth-client.new', {
            parent: 'oauth-client',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-client/oauth-client-dialog.html',
                    controller: 'Oauth_clientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                client_id: null,
                                client_secret: null,
                                redirect_uri: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('oauth-client', null, { reload: true });
                }, function() {
                    $state.go('oauth-client');
                });
            }]
        })
        .state('oauth-client.edit', {
            parent: 'oauth-client',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-client/oauth-client-dialog.html',
                    controller: 'Oauth_clientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Oauth_client', function(Oauth_client) {
                            return Oauth_client.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-client', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('oauth-client.delete', {
            parent: 'oauth-client',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-client/oauth-client-delete-dialog.html',
                    controller: 'Oauth_clientDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Oauth_client', function(Oauth_client) {
                            return Oauth_client.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-client', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
