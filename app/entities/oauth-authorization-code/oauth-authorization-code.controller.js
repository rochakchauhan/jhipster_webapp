(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_authorization_codeController', Oauth_authorization_codeController);

    Oauth_authorization_codeController.$inject = ['$scope', '$state', 'Oauth_authorization_code'];

    function Oauth_authorization_codeController ($scope, $state, Oauth_authorization_code) {
        var vm = this;
        
        vm.oauth_authorization_codes = [];

        loadAll();

        function loadAll() {
            Oauth_authorization_code.query(function(result) {
                vm.oauth_authorization_codes = result;
            });
        }
    }
})();
