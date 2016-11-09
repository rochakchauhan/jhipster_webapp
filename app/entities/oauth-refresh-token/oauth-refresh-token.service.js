(function() {
    'use strict';
    angular
        .module('oAuthApp')
        .factory('Oauth_refresh_token', Oauth_refresh_token);

    Oauth_refresh_token.$inject = ['$resource'];

    function Oauth_refresh_token ($resource) {
        var resourceUrl =  'api/oauth-refresh-tokens/:id';

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
