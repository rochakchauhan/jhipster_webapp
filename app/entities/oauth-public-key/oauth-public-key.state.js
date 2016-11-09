(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('oauth-public-key', {
            parent: 'entity',
            url: '/oauth-public-key',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_public_key.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-public-key/oauth-public-keys.html',
                    controller: 'Oauth_public_keyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_public_key');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('oauth-public-key-detail', {
            parent: 'entity',
            url: '/oauth-public-key/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.oauth_public_key.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/oauth-public-key/oauth-public-key-detail.html',
                    controller: 'Oauth_public_keyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('oauth_public_key');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Oauth_public_key', function($stateParams, Oauth_public_key) {
                    return Oauth_public_key.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('oauth-public-key.new', {
            parent: 'oauth-public-key',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-public-key/oauth-public-key-dialog.html',
                    controller: 'Oauth_public_keyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                client_id: null,
                                public_key: null,
                                private_key: null,
                                encryption_algorithm: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('oauth-public-key', null, { reload: true });
                }, function() {
                    $state.go('oauth-public-key');
                });
            }]
        })
        .state('oauth-public-key.edit', {
            parent: 'oauth-public-key',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-public-key/oauth-public-key-dialog.html',
                    controller: 'Oauth_public_keyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Oauth_public_key', function(Oauth_public_key) {
                            return Oauth_public_key.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-public-key', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('oauth-public-key.delete', {
            parent: 'oauth-public-key',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/oauth-public-key/oauth-public-key-delete-dialog.html',
                    controller: 'Oauth_public_keyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Oauth_public_key', function(Oauth_public_key) {
                            return Oauth_public_key.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauth-public-key', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
