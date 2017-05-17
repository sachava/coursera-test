(function(){
	'use strict';

	 angular.module('NarrowItDownApp', [])
			.controller('NarrowItDownController', NarrowItDownController)
			.service('MenuSearchService', MenuSearchService)
			// // .directive()
			.constant('URL', 'http://davids-restaurant.herokuapp.com/menu_items.json');

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
	   var NarrowItDownController = this;
	   NarrowItDownController.items =[];
	   NarrowItDownController.warning = "";
	   NarrowItDownController.searchstring = "";

	   NarrowItDownController.buttonclick = function () {
	   	    if (NarrowItDownController.searchstring.trim()==="") {
	   	    	NarrowItDownController.warning = "Nothing found! Enter correct value.";
	   	    	NarrowItDownController.searchstring = "";
	   	    	return;
	   	    }
	   		var promise = MenuSearchService.getmatchedMenuItems();
	   		promise.then(
						function success(response) {
 							var resp_items = response.data.menu_items;
 							// searching through items
 							var found = [];
 							var etalon = NarrowItDownController.searchstring;
 							etalon = etalon.trim().toLowerCase();
 							
 							for (var i=0; i<resp_items.length; i++) {
 								var desc = resp_items[i].description.toLowerCase();
 								
 								if (desc.indexOf(etalon) !== -1) {
 										found.push(resp_items[i]);
 								}
 								
 							};

 							NarrowItDownController.items = found;

 							if (found.length == 0) {
 								NarrowItDownController.warning = "Nothing found!"; 								
 							} 
						})
	   					.catch(
							function errors (response) {
								NarrowItDownController.items = [];
								NarrowItDownController.warning = "It happens something wrong!";
								console.log(response)
							});

	  };
	};

	MenuSearchService.$inject = ['URL', '$http'];
	function MenuSearchService (URL, $http) {
		var MenuSearchService = this;

		MenuSearchService.getmatchedMenuItems = function (searchTerm) {
			var response = $http({
							method: "GET",
							url: URL
							});
			return response;
		}

	}


})();