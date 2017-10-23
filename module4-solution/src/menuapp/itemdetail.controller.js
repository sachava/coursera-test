(function () {
	'use strict';

	angular.module('MenuApp').
	controller('itemDetailController', itemDetailController);

	itemDetailController.$inject = ['$stateParams','itemsobj'];

	function itemDetailController ($stateParams, itemsobj) {
		var itemDetailController = this;

		//console.log(itemsobj)
		var item = itemsobj.menu_items[$stateParams.itemid]

		itemDetailController.name = item.name;
		itemDetailController.desc = item.description;
		itemDetailController.large_portion_name	= item.large_portion_name;
		itemDetailController.price_large = item.price_large;

		itemDetailController.small_portion_name = item.small_portion_name;
		itemDetailController.price_small = item.price_small;

		// console.log(categories)
	}

})();