(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('User_profileDeleteController',User_profileDeleteController);

    User_profileDeleteController.$inject = ['$uibModalInstance', 'entity', 'User_profile'];

    function User_profileDeleteController($uibModalInstance, entity, User_profile) {
        var vm = this;

        vm.user_profile = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            User_profile.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
