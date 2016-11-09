(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_refresh_tokenDetailController', Oauth_refresh_tokenDetailController);

    Oauth_refresh_tokenDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Oauth_refresh_token'];

    function Oauth_refresh_tokenDetailController($scope, $rootScope, $stateParams, entity, Oauth_refresh_token) {
        var vm = this;

        vm.oauth_refresh_token = entity;

        var unsubscribe = $rootScope.$on('oAuthApp:oauth_refresh_tokenUpdate', function(event, result) {
            vm.oauth_refresh_token = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
