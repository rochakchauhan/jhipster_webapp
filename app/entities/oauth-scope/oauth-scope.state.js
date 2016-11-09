(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('oauth-scope', {
            parent: 'entity',
            url: '/oauth-scope',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_scope.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-scope/oauth-scopes.html',
                    controller: 'Oauth_scopeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_scope');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('oauth-scope-detail', {
            parent: 'entity',
            url: '/oauth-scope/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_scope.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-scope/oauth-scope-detail.html',
                    controller: 'Oauth_scopeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_scope');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Oauth_scope', function($stateParams, Oauth_scope) {
                    return Oauth_scope.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('oauth-scope.new', {
            parent: 'oauth-scope',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-scope/oauth-scope-dialog.html',
                    controller: 'Oauth_scopeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                scope: null,
                                is_default: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('oauth-scope', null, { reload: true });
                }, function() {
                    $state.go('oauth-scope');
                });
            }]
        })
        .state('oauth-scope.edit', {
            parent: 'oauth-scope',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-scope/oauth-scope-dialog.html',
                    controller: 'Oauth_scopeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Oauth_scope', function(Oauth_scope) {
                            return Oauth_scope.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-scope', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('oauth-scope.delete', {
            parent: 'oauth-scope',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-scope/oauth-scope-delete-dialog.html',
                    controller: 'Oauth_scopeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Oauth_scope', function(Oauth_scope) {
                            return Oauth_scope.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-scope', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
