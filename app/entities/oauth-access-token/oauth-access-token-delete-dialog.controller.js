(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_access_tokenDeleteController',Oauth_access_tokenDeleteController);

    Oauth_access_tokenDeleteController.$inject = ['$uibModalInstance', 'entity', 'Oauth_access_token'];

    function Oauth_access_tokenDeleteController($uibModalInstance, entity, Oauth_access_token) {
        var vm = this;

        vm.oauth_access_token = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Oauth_access_token.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
