(function() {
    'use strict';
    angular
        .module('oAuthApp')
        .factory('User_profile', User_profile);

    User_profile.$inject = ['$resource'];

    function User_profile ($resource) {
        var resourceUrl =  'api/user-profiles/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
