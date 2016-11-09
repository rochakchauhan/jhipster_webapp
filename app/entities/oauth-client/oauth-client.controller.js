(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_clientController', Oauth_clientController);

    Oauth_clientController.$inject = ['$scope', '$state', 'Oauth_client'];

    function Oauth_clientController ($scope, $state, Oauth_client) {
        var vm = this;
        
        vm.oauth_clients = [];

        loadAll();

        function loadAll() {
            Oauth_client.query(function(result) {
                vm.oauth_clients = result;
            });
        }
    }
})();
