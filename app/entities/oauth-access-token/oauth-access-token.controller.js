(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_access_tokenController', Oauth_access_tokenController);

    Oauth_access_tokenController.$inject = ['$scope', '$state', 'Oauth_access_token'];

    function Oauth_access_tokenController ($scope, $state, Oauth_access_token) {
        var vm = this;
        
        vm.oauth_access_tokens = [];

        loadAll();

        function loadAll() {
            Oauth_access_token.query(function(result) {
                vm.oauth_access_tokens = result;
            });
        }
    }
})();
