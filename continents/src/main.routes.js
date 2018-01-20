 (function () {
	'use strict';

	angular.module('main').
	config(configRoutes);

	configRoutes.$inject = ['$stateProvider']

	function configRoutes ($stateProvider) {

		$stateProvider
		.state('home.main', {
			url: '/',
			templateUrl: 'src/main.home.html'
			}
		)

	}
	
}) ();