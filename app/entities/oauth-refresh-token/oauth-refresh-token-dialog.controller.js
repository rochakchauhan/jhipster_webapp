(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_refresh_tokenDialogController', Oauth_refresh_tokenDialogController);

    Oauth_refresh_tokenDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Oauth_refresh_token'];

    function Oauth_refresh_tokenDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Oauth_refresh_token) {
        var vm = this;

        vm.oauth_refresh_token = entity;
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
            if (vm.oauth_refresh_token.id !== null) {
                Oauth_refresh_token.update(vm.oauth_refresh_token, onSaveSuccess, onSaveError);
            } else {
                Oauth_refresh_token.save(vm.oauth_refresh_token, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('oAuthApp:oauth_refresh_tokenUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
