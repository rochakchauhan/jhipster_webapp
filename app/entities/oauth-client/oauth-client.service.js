(function() {
    'use strict';
    angular
        .module('oAuthApp')
        .factory('Oauth_client', Oauth_client);

    Oauth_client.$inject = ['$resource'];

    function Oauth_client ($resource) {
        var resourceUrl =  'api/oauth-clients/:id';

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
