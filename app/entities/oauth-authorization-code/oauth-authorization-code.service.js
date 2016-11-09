(function() {
    'use strict';
    angular
        .module('oAuthApp')
        .factory('Oauth_authorization_code', Oauth_authorization_code);

    Oauth_authorization_code.$inject = ['$resource'];

    function Oauth_authorization_code ($resource) {
        var resourceUrl =  'api/oauth-authorization-codes/:id';

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
