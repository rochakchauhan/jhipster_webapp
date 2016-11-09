(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('oauth-access-token', {
            parent: 'entity',
            url: '/oauth-access-token',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_access_token.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-access-token/oauth-access-tokens.html',
                    controller: 'Oauth_access_tokenController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_access_token');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('oauth-access-token-detail', {
            parent: 'entity',
            url: '/oauth-access-token/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_access_token.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-access-token/oauth-access-token-detail.html',
                    controller: 'Oauth_access_tokenDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_access_token');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Oauth_access_token', function($stateParams, Oauth_access_token) {
                    return Oauth_access_token.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('oauth-access-token.new', {
            parent: 'oauth-access-token',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-access-token/oauth-access-token-dialog.html',
                    controller: 'Oauth_access_tokenDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                access_token: null,
                                client_id: null,
                                user_id: null,
                                expires: null,
                                scope: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('oauth-access-token', null, { reload: true });
                }, function() {
                    $state.go('oauth-access-token');
                });
            }]
        })
        .state('oauth-access-token.edit', {
            parent: 'oauth-access-token',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-access-token/oauth-access-token-dialog.html',
                    controller: 'Oauth_access_tokenDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Oauth_access_token', function(Oauth_access_token) {
                            return Oauth_access_token.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-access-token', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('oauth-access-token.delete', {
            parent: 'oauth-access-token',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-access-token/oauth-access-token-delete-dialog.html',
                    controller: 'Oauth_access_tokenDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Oauth_access_token', function(Oauth_access_token) {
                            return Oauth_access_token.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-access-token', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
