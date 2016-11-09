(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_authorization_codeDeleteController',Oauth_authorization_codeDeleteController);

    Oauth_authorization_codeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Oauth_authorization_code'];

    function Oauth_authorization_codeDeleteController($uibModalInstance, entity, Oauth_authorization_code) {
        var vm = this;

        vm.oauth_authorization_code = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Oauth_authorization_code.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
