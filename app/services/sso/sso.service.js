(function() {
	'use strict';

	angular
		.module('oAuthApp')
		.factory('SSO', SSO);

	SSO.$inject = [ '$http','$q', '$localStorage', 'JhiTrackerService' ];

	function SSO($http, $q, $localStorage, JhiTrackerService) {
		var service = {
			test: abc,
			init_register:init_register,
			init_authenticate:init_authenticate			
		};

		return service;

		function abc(){
			console.log("TEST CALLED ");
			return "3523523,7567457,377347";
		}
		
		
		function init_authenticate(data) {
			
			 var deferred = $q.defer();
		     $http({
		    	 method: 'POST', 
		         data: data,
		         url: 'http://127.0.0.1:8383/api/authenticate',
		         headers:{
		        	    'Access-Control-Allow-Origin' : '*',
		        	    'X-Application-Context':'oAuth:dev:8383'
		            }
		     })
		     .success(function(data){
		    	 console.log("DATA: "+data);
		         deferred.resolve(data);
		     }).error(function(){
		    	 console.log("ERROR: "+error);
		         deferred.reject(error);
		     });
		     console.log("RESPONSE: ");
		     console.log(deferred.promise);
		     return deferred.promise;		     
		}
		
		
		function init_register(data) {
			var postData=data;

			return $http.post('api/farmer-commodity-auctions', postData, {
				headers : {
					'Content-Type' : 'application/json'
				}
			}).success(function(response) {
				return response;
			});
		}

		
	}
})();