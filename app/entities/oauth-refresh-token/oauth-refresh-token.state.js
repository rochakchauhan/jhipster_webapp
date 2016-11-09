(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('oauth-refresh-token', {
            parent: 'entity',
            url: '/oauth-refresh-token',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_refresh_token.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-refresh-token/oauth-refresh-tokens.html',
                    controller: 'Oauth_refresh_tokenController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_refresh_token');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('oauth-refresh-token-detail', {
            parent: 'entity',
            url: '/oauth-refresh-token/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_refresh_token.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-refresh-token/oauth-refresh-token-detail.html',
                    controller: 'Oauth_refresh_tokenDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_refresh_token');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Oauth_refresh_token', function($stateParams, Oauth_refresh_token) {
                    return Oauth_refresh_token.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('oauth-refresh-token.new', {
            parent: 'oauth-refresh-token',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-refresh-token/oauth-refresh-token-dialog.html',
                    controller: 'Oauth_refresh_tokenDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                refresh_token: null,
                                client_id: null,
                                user_id: null,
                                expires: null,
                                scope: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('oauth-refresh-token', null, { reload: true });
                }, function() {
                    $state.go('oauth-refresh-token');
                });
            }]
        })
        .state('oauth-refresh-token.edit', {
            parent: 'oauth-refresh-token',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-refresh-token/oauth-refresh-token-dialog.html',
                    controller: 'Oauth_refresh_tokenDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Oauth_refresh_token', function(Oauth_refresh_token) {
                            return Oauth_refresh_token.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-refresh-token', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('oauth-refresh-token.delete', {
            parent: 'oauth-refresh-token',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-refresh-token/oauth-refresh-token-delete-dialog.html',
                    controller: 'Oauth_refresh_tokenDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Oauth_refresh_token', function(Oauth_refresh_token) {
                            return Oauth_refresh_token.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-refresh-token', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
