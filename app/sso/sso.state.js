(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('sso', {
            parent: 'app',
            url: '/sso',     
            data: [],
            views: {
                'content@': {
                    templateUrl: 'app/sso/sso.html',
                    controller: 'SsoController',
                    controllerAs: 'SsoViewModel'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
