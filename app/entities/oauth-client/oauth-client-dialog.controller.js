(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_clientDialogController', Oauth_clientDialogController);

    Oauth_clientDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Oauth_client'];

    function Oauth_clientDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Oauth_client) {
        var vm = this;

        vm.oauth_client = entity;
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
            if (vm.oauth_client.id !== null) {
                Oauth_client.update(vm.oauth_client, onSaveSuccess, onSaveError);
            } else {
                Oauth_client.save(vm.oauth_client, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('oAuthApp:oauth_clientUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
