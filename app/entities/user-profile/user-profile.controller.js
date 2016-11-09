(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('User_profileController', User_profileController);

    User_profileController.$inject = ['$scope', '$state', 'User_profile'];

    function User_profileController ($scope, $state, User_profile) {
        var vm = this;
        
        vm.user_profiles = [];
		
		
        loadAll();

        function loadAll() {
            User_profile.query(function(result) {
                vm.user_profiles = result;
            });
        }
    }
})();
