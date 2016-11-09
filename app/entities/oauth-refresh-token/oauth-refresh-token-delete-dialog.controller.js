(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_refresh_tokenDeleteController',Oauth_refresh_tokenDeleteController);

    Oauth_refresh_tokenDeleteController.$inject = ['$uibModalInstance', 'entity', 'Oauth_refresh_token'];

    function Oauth_refresh_tokenDeleteController($uibModalInstance, entity, Oauth_refresh_token) {
        var vm = this;

        vm.oauth_refresh_token = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Oauth_refresh_token.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
