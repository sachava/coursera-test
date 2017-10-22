(function () {
	'use strict';

	angular.module('MenuApp').
	controller('itemsController', itemsController);

	itemsController.$inject = ['itemsobj'];

	function itemsController (itemsobj) {
		// console.log('itemsobj', itemsobj)
		var categoriesController = this;

		categoriesController.items 	= itemsobj.menu_items;
		categoriesController.name	= itemsobj.category.name;
		categoriesController.special_instructions	= itemsobj.category.special_instructions;
		//console.log(items)
	}

})();