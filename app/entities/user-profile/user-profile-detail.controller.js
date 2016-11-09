(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('User_profileDetailController', User_profileDetailController);

    User_profileDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'User_profile'];

    function User_profileDetailController($scope, $rootScope, $stateParams, entity, User_profile) {
        var vm = this;

        vm.user_profile = entity;

        var unsubscribe = $rootScope.$on('oAuthApp:user_profileUpdate', function(event, result) {
            vm.user_profile = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
