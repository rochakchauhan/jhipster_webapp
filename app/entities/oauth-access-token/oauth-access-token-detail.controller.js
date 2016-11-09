(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_access_tokenDetailController', Oauth_access_tokenDetailController);

    Oauth_access_tokenDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Oauth_access_token'];

    function Oauth_access_tokenDetailController($scope, $rootScope, $stateParams, entity, Oauth_access_token) {
        var vm = this;

        vm.oauth_access_token = entity;

        var unsubscribe = $rootScope.$on('oAuthApp:oauth_access_tokenUpdate', function(event, result) {
            vm.oauth_access_token = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
