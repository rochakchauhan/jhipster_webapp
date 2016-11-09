(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('User_profileDialogController', User_profileDialogController);

    User_profileDialogController.$inject = ['User','$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'User_profile'];

    function User_profileDialogController (User, $timeout, $scope, $stateParams, $uibModalInstance, entity, User_profile) {
        var vm = this;

        vm.user_profile = entity;
        vm.clear = clear;
        vm.save = save;
		vm.users=Array(1,2,3,4);
		vm.allUsers="";
		
		getAllUsers();
		
		function getAllUsers(){
			console.log("Started");
			vm.allUsers=User.getusers();
			console.log(vm.allUsers);
		}
        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });
		
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.user_profile.id !== null) {
                User_profile.update(vm.user_profile, onSaveSuccess, onSaveError);
            } else {
                User_profile.save(vm.user_profile, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('oAuthApp:user_profileUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
