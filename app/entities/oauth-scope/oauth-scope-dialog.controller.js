(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('Oauth_scopeDialogController', Oauth_scopeDialogController);

    Oauth_scopeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Oauth_scope'];

    function Oauth_scopeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Oauth_scope) {
        var vm = this;

        vm.oauth_scope = entity;
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
            if (vm.oauth_scope.id !== null) {
                Oauth_scope.update(vm.oauth_scope, onSaveSuccess, onSaveError);
            } else {
                Oauth_scope.save(vm.oauth_scope, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('oAuthApp:oauth_scopeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
