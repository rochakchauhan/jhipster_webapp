(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_public_keyDialogController', Oauth_public_keyDialogController);

    Oauth_public_keyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Oauth_public_key'];

    function Oauth_public_keyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Oauth_public_key) {
        var vm = this;

        vm.oauth_public_key = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.oauth_public_key.id !== null) {
                Oauth_public_key.update(vm.oauth_public_key, onSaveSuccess, onSaveError);
            } else {
                Oauth_public_key.save(vm.oauth_public_key, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('oAuthApp:oauth_public_keyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
