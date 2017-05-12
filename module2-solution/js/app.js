
(function (){

	angular.module('ShoppingListCheckOff',[])
	.controller('ToBuyController',ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService',ShoppingListCheckOffService);


	ToBuyController.$inject = ['ShoppingListCheckOffService'];

	function ToBuyController(ShoppingListCheckOffService) {
		this.items = ShoppingListCheckOffService.getToBuyItems();
		this.bought = function(index) {
			ShoppingListCheckOffService.bought(index);
		}
	};


	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	
	function AlreadyBoughtController(ShoppingListCheckOffService){
		this.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
	};

	function ShoppingListCheckOffService() {
		var ToBuyItems = [	{name: "cookies", quantity: 10},
							{name: "oranges", quantity: 5},
							{name: "cheese", quantity: 1},
							{name: "tea", quantity: 2},
							{name: "iPhones", quantity: 7}
							];
		var AlreadyBoughtItems =[];

		this.getToBuyItems = function() {
			return ToBuyItems;
		}

		this.bought = function(index) {
			AlreadyBoughtItems.push(ToBuyItems[index]);
			ToBuyItems.splice(index,1)
		}

		this.getAlreadyBoughtItems = function () {
			return AlreadyBoughtItems;
		}
	}

}) ();