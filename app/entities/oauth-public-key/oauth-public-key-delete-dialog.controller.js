(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_public_keyDeleteController',Oauth_public_keyDeleteController);

    Oauth_public_keyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Oauth_public_key'];

    function Oauth_public_keyDeleteController($uibModalInstance, entity, Oauth_public_key) {
        var vm = this;

        vm.oauth_public_key = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Oauth_public_key.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
