/* Before start we are reading configaration from data/config.json file*/

 (function () {
	'use strict';

	angular.module('config').
	config(configRoutes);

	configRoutes.$inject = ['$httpProvider', '$urlRouterProvider', '$stateProvider']

	function configRoutes ($httpProvider, $urlRouterProvider, $stateProvider) {

		$httpProvider.interceptors.push('loadingHttpInterceptor');
		
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home', {
			abstract: true,
			// templateUrl: 'src/main.home.html',
			resolve: {
				config: ['$http', function ($http) {
					  	return $http.get('data/config.json').then(function (response) {
 						  		 	// console.log(response.data);
            						return response.data
   				   				})
   						}]
				}

			}
		)

	}
	
}) ();