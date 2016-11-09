(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_scopeDetailController', Oauth_scopeDetailController);

    Oauth_scopeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Oauth_scope'];

    function Oauth_scopeDetailController($scope, $rootScope, $stateParams, entity, Oauth_scope) {
        var vm = this;

        vm.oauth_scope = entity;

        var unsubscribe = $rootScope.$on('oAuthApp:oauth_scopeUpdate', function(event, result) {
            vm.oauth_scope = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
