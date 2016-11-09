(function() {
    'use strict';

    angular
        .module('oAuthApp')
        .controller('SsoController', SsoController);

    SsoController.$inject =['$scope','$location','Principal', 'LoginService', '$state'];

    function SsoController ($scope, $location,Principal,SSO,LoginService, $state) {
        var SsoViewModel = this;
        //var p = $location.absUrl();
        //console.log("========================");
        //console.log(p);
       
        SsoViewModel.results="NO RESULTS";
        SsoViewModel.msg="";
        
        SsoViewModel.authorities = [];
        SsoViewModel.account = null;
        SsoViewModel.isAuthenticated = null;
        SsoViewModel.formdata=[];
        
        SsoViewModel.Ssologin=function (){

        	SsoViewModel.formdata.rememberMe="0";
        	console.log(SsoViewModel.formdata);
        	
        	console.log(SsoViewModel.getParams($location.absUrl()));
        	SsoViewModel.msg="Please wait...Authenticating. "+$location.absUrl();
        	//SSO.init_authenticate(SsoViewModel.formdata);
        	
        }
        
        SsoViewModel.getParams=function (url){
        	var _url=url.split('?');
        	var paramsArray =[];
        	
        	if(_url.length>1){
        		_url=_url[1].split('#');
        		paramsArray=_url[0].split('&');
        	}
        	
        	return paramsArray;
        }
    }
})();