(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_clientDetailController', Oauth_clientDetailController);

    Oauth_clientDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Oauth_client'];

    function Oauth_clientDetailController($scope, $rootScope, $stateParams, entity, Oauth_client) {
        var vm = this;

        vm.oauth_client = entity;

        var unsubscribe = $rootScope.$on('oAuthApp:oauth_clientUpdate', function(event, result) {
            vm.oauth_client = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
