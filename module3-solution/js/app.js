(function(){
	'use strict';

	 angular.module('NarrowItDownApp', [])
			.controller('NarrowItDownController', NarrowItDownController)
			.service('MenuSearchService', MenuSearchService)
			.directive('foundItems', foundItemsDirective)
			.constant('URL', 'https://davids-restaurant.herokuapp.com/menu_items.json');

	
	function foundItemsDirective () {
		var ddo = {
			templateUrl: "html/founditems.html",
			 scope: {
			 	items: '<myItems',
			 	notEmpty: '<notEmpty',
			 	removing: '&onRemove'
			}
		}
		return ddo;
	};

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
	   var NarrowItDownController = this;
	   NarrowItDownController.found = [];
	   MenuSearchService.setEroor("");
	   NarrowItDownController.searchstring = "";

	   NarrowItDownController.buttonclick = function () {
	   	    if (NarrowItDownController.searchstring.trim()==="") {
	   	    	NarrowItDownController.found = [];
	   	    	MenuSearchService.setEroor("Nothing found! Enter correct value.");
	   	    	NarrowItDownController.searchstring = "";
	   	    } else {
	   		    NarrowItDownController.found = MenuSearchService.getmatchedMenuItems(NarrowItDownController.searchstring);
	    	};
	    };

	    NarrowItDownController.notEmptyListOfItems = function () {
	    	return NarrowItDownController.found.length>0;
	    }

	    NarrowItDownController.removing = function(index) {
	    	NarrowItDownController.found.splice(index, 1);
	    }

	    NarrowItDownController.warning = function () {
	    	return MenuSearchService.warning;
	    }
	};



	MenuSearchService.$inject = ['URL', '$http'];
	function MenuSearchService (URL, $http) {
		var MenuSearchService = this;
		var items = [];
		MenuSearchService.warning = "";

		MenuSearchService.setEroor = function (error) {
			MenuSearchService.warning = error;
		};
		
		MenuSearchService.getmatchedMenuItems = function (searchName) {
			items = [];
			searchName = searchName.trim().toLowerCase();
			MenuSearchService.warning ="";
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