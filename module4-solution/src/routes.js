(function () {
	'use strict';

	angular.module('MenuApp').
	config(RoutesConfig);

	RoutesConfig.$inject = ['$urlRouterProvider', '$stateProvider']

	function RoutesConfig ($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: "src/menuapp/templates/home.template.html"
		})

		.state('categories', {
			url: '/categories',
			templateUrl: "src/menuapp/templates/categories.template.html",
			controller: 'categoriesController as cats',
			resolve: {
				categories: ['MenuDataService', function (MenuDataService) {
					return MenuDataService.getAllCategories().
					then(function (response) {
						return response.data
					});
				}]
			}
		})

		.state('itemsview', {
			url: '/items/{param}',
			templateUrl: 'src/menuapp/templates/items.template.html',
			controller: 'itemsController as ic',
			resolve: {
			    itemsobj: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
			    	// console.log("$stateParams.param =" + $stateParams.param);
			    	return MenuDataService.getItemsForCategory($stateParams.param).
			    	then (function (response) {
			    		return response.data
			    	}).
			    	then (function(data) {
			    		// console.log(data)
			    		return data
			    	})
			    }]
			}	

		})

	}

})();