(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_public_keyController', Oauth_public_keyController);

    Oauth_public_keyController.$inject = ['$scope', '$state', 'Oauth_public_key'];

    function Oauth_public_keyController ($scope, $state, Oauth_public_key) {
        var vm = this;
        
        vm.oauth_public_keys = [];

        loadAll();

        function loadAll() {
            Oauth_public_key.query(function(result) {
                vm.oauth_public_keys = result;
            });
        }
    }
})();
