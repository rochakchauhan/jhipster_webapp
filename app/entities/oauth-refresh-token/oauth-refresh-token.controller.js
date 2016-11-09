(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_refresh_tokenController', Oauth_refresh_tokenController);

    Oauth_refresh_tokenController.$inject = ['$scope', '$state', 'Oauth_refresh_token'];

    function Oauth_refresh_tokenController ($scope, $state, Oauth_refresh_token) {
        var vm = this;
        
        vm.oauth_refresh_tokens = [];

        loadAll();

        function loadAll() {
            Oauth_refresh_token.query(function(result) {
                vm.oauth_refresh_tokens = result;
            });
        }
    }
})();
