(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_scopeController', Oauth_scopeController);

    Oauth_scopeController.$inject = ['$scope', '$state', 'Oauth_scope'];

    function Oauth_scopeController ($scope, $state, Oauth_scope) {
        var vm = this;
        
        vm.oauth_scopes = [];

        loadAll();

        function loadAll() {
            Oauth_scope.query(function(result) {
                vm.oauth_scopes = result;
            });
        }
    }
})();
