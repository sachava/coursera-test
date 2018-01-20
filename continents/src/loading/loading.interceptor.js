(function () {
	'use strict';


	angular.module('config')
	.factory('loadingHttpInterceptor', LoadingHttpInterceptor);

	LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];

	function LoadingHttpInterceptor ($rootScope, $q) {
		var  count = 0;
		var loadEventName = 'spinner:activate';

		return {
			request: function(config) {
		//		console.log(config)
				if (++count===1) {
					$rootScope.$broadcast(loadEventName,{on:true})
				}
				return config;
			},
			response:  function (response) {
			//	console.log(response)
				if (--count===0) {
					$rootScope.$broadcast(loadEventName,{on:false})
				}
				return response;
			},
			responseError:  function (response) {
				if (--count===0) {
					$rootScope.$broadcast(loadEventName,{on:false})
				}
				return $q.reject(response);
			},
		} 
	}
}) ();