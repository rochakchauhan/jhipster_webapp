(function() {
    'use strict';
    angular
        .module('oAuthApp')
        .factory('Oauth_public_key', Oauth_public_key);

    Oauth_public_key.$inject = ['$resource'];

    function Oauth_public_key ($resource) {
        var resourceUrl =  'api/oauth-public-keys/:id';

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
