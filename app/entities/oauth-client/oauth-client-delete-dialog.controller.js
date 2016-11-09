(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_clientDeleteController',Oauth_clientDeleteController);

    Oauth_clientDeleteController.$inject = ['$uibModalInstance', 'entity', 'Oauth_client'];

    function Oauth_clientDeleteController($uibModalInstance, entity, Oauth_client) {
        var vm = this;

        vm.oauth_client = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Oauth_client.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
