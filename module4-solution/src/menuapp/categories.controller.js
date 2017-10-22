(function () {
	'use strict';

	angular.module('MenuApp').
	controller('categoriesController', categoriesController);

	categoriesController.$inject = ['categories'];

	function categoriesController (categories) {
		var categoriesController = this;

		categoriesController.categories = categories;

		// console.log(categories)
	}

})();