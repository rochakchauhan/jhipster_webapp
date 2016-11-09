(function() {
    'use strict';
    angular
        .module('oAuthApp')
        .factory('Oauth_scope', Oauth_scope);

    Oauth_scope.$inject = ['$resource'];

    function Oauth_scope ($resource) {
        var resourceUrl =  'api/oauth-scopes/:id';

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
