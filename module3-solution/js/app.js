(function(){
	'use strict';

	 angular.module('NarrowItDownApp', [])
			.controller('NarrowItDownController', NarrowItDownController)
			.service('MenuSearchService', MenuSearchService)
			.directive('foundItems', foundItemsDirective)
			.constant('URL', 'http://davids-restaurant.herokuapp.com/menu_items.json');

	
	function foundItemsDirective () {
		var ddo = {
			templateUrl: "../founditems.html"
		}
		return ddo;
	};

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
	   var NarrowItDownController = this;
	   NarrowItDownController.items = [];
	   NarrowItDownController.warning = "";
	   NarrowItDownController.searchstring = "";

	   NarrowItDownController.buttonclick = function () {
	   	    if (NarrowItDownController.searchstring.trim()==="") {
	   	    	NarrowItDownController.warning = "Nothing found! Enter correct value.";
	   	    	NarrowItDownController.searchstring = "";
	   	    } else {
	   		    NarrowItDownController.items = MenuSearchService.getmatchedMenuItems(NarrowItDownController.searchstring);
	    	};
	    };
	};

	MenuSearchService.$inject = ['URL', '$http'];
	function MenuSearchService (URL, $http) {
		var MenuSearchService = this;
		var items = [];
		
		MenuSearchService.getmatchedMenuItems = function (searchName) {
			items = [];
			searchName = searchName.trim().toLowerCase();
			$http({ method: "GET",
					url: URL
			}).then(
					 function success(response) {
 						var resp_items = response.data.menu_items; 							
 							for (var i=0; i<resp_items.length; i++) {
 								if (resp_items[i].description.toLowerCase().indexOf(searchName) !== -1) {
 										items.push(resp_items[i]);
 								}
 								
 							};
 							if (items.length == 0) {
 								MenuSearchService.warning = "Nothing found!"; 								
 							} 
						})
	   		.catch(
					function errors (response) {
							  items = [];
							  MenuSearchService.warning = "It happens something wrong!";
							  console.log(response)
							});
	   		return items;
		}

	}


})();