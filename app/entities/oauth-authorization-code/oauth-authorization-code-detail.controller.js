(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_authorization_codeDetailController', Oauth_authorization_codeDetailController);

    Oauth_authorization_codeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Oauth_authorization_code'];

    function Oauth_authorization_codeDetailController($scope, $rootScope, $stateParams, entity, Oauth_authorization_code) {
        var vm = this;

        vm.oauth_authorization_code = entity;

        var unsubscribe = $rootScope.$on('oAuthApp:oauth_authorization_codeUpdate', function(event, result) {
            vm.oauth_authorization_code = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
