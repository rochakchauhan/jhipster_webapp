(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_public_keyDetailController', Oauth_public_keyDetailController);

    Oauth_public_keyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Oauth_public_key'];

    function Oauth_public_keyDetailController($scope, $rootScope, $stateParams, entity, Oauth_public_key) {
        var vm = this;

        vm.oauth_public_key = entity;

        var unsubscribe = $rootScope.$on('oAuthApp:oauth_public_keyUpdate', function(event, result) {
            vm.oauth_public_key = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
