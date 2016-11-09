(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_scopeDeleteController',Oauth_scopeDeleteController);

    Oauth_scopeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Oauth_scope'];

    function Oauth_scopeDeleteController($uibModalInstance, entity, Oauth_scope) {
        var vm = this;

        vm.oauth_scope = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Oauth_scope.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
