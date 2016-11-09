(function() {
    'use strict';
    angular
        .module('oAuthApp')
        .factory('Oauth_access_token', Oauth_access_token);

    Oauth_access_token.$inject = ['$resource'];

    function Oauth_access_token ($resource) {
        var resourceUrl =  'api/oauth-access-tokens/:id';

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
