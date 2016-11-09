(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('user-profile', {
            parent: 'entity',
            url: '/user-profile',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.user_profile.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-profile/user-profiles.html',
                    controller: 'User_profileController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('user_profile');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('user-profile-detail', {
            parent: 'entity',
            url: '/user-profile/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'oAuthApp.user_profile.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-profile/user-profile-detail.html',
                    controller: 'User_profileDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('user_profile');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'User_profile', function($stateParams, User_profile) {
                    return User_profile.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('user-profile.new', {
            parent: 'user-profile',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-profile/user-profile-dialog.html',
                    controller: 'User_profileDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                aadhaar_number: null,
                                mobile_number: null,
                                user_id: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('user-profile', null, { reload: true });
                }, function() {
                    $state.go('user-profile');
                });
            }]
        })
        .state('user-profile.edit', {
            parent: 'user-profile',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-profile/user-profile-dialog.html',
                    controller: 'User_profileDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['User_profile', function(User_profile) {
                            return User_profile.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-profile', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-profile.delete', {
            parent: 'user-profile',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-profile/user-profile-delete-dialog.html',
                    controller: 'User_profileDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['User_profile', function(User_profile) {
                            return User_profile.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-profile', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
