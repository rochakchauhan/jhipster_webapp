(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_access_tokenDialogController', Oauth_access_tokenDialogController);

    Oauth_access_tokenDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Oauth_access_token'];

    function Oauth_access_tokenDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Oauth_access_token) {
        var vm = this;

        vm.oauth_access_token = entity;
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
            if (vm.oauth_access_token.id !== null) {
                Oauth_access_token.update(vm.oauth_access_token, onSaveSuccess, onSaveError);
            } else {
                Oauth_access_token.save(vm.oauth_access_token, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('oAuthApp:oauth_access_tokenUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
