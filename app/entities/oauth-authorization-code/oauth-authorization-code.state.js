(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('oauth-authorization-code', {
            parent: 'entity',
            url: '/oauth-authorization-code',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_authorization_code.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-authorization-code/oauth-authorization-codes.html',
                    controller: 'Oauth_authorization_codeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_authorization_code');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('oauth-authorization-code-detail', {
            parent: 'entity',
            url: '/oauth-authorization-code/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_authorization_code.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-authorization-code/oauth-authorization-code-detail.html',
                    controller: 'Oauth_authorization_codeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_authorization_code');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Oauth_authorization_code', function($stateParams, Oauth_authorization_code) {
                    return Oauth_authorization_code.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('oauth-authorization-code.new', {
            parent: 'oauth-authorization-code',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-authorization-code/oauth-authorization-code-dialog.html',
                    controller: 'Oauth_authorization_codeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                authorization_code: null,
                                client_id: null,
                                user_id: null,
                                redirect_uri: null,
                                expires: null,
                                scope: null,
                                id_token: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('oauth-authorization-code', null, { reload: true });
                }, function() {
                    $state.go('oauth-authorization-code');
                });
            }]
        })
        .state('oauth-authorization-code.edit', {
            parent: 'oauth-authorization-code',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-authorization-code/oauth-authorization-code-dialog.html',
                    controller: 'Oauth_authorization_codeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Oauth_authorization_code', function(Oauth_authorization_code) {
                            return Oauth_authorization_code.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-authorization-code', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('oauth-authorization-code.delete', {
            parent: 'oauth-authorization-code',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-authorization-code/oauth-authorization-code-delete-dialog.html',
                    controller: 'Oauth_authorization_codeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Oauth_authorization_code', function(Oauth_authorization_code) {
                            return Oauth_authorization_code.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-authorization-code', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
