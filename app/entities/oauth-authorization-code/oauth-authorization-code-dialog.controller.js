(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_authorization_codeDialogController', Oauth_authorization_codeDialogController);

    Oauth_authorization_codeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Oauth_authorization_code'];

    function Oauth_authorization_codeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Oauth_authorization_code) {
        var vm = this;

        vm.oauth_authorization_code = entity;
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
            if (vm.oauth_authorization_code.id !== null) {
                Oauth_authorization_code.update(vm.oauth_authorization_code, onSaveSuccess, onSaveError);
            } else {
                Oauth_authorization_code.save(vm.oauth_authorization_code, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('oAuthApp:oauth_authorization_codeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
