// a component called items that shows all of the menu items for a particular category

(function () {
	'use strict';

	angular.module('MenuApp').
	component('menuItems', {
		templateUrl: "src/menuapp/templates/items.component.template.html",
		bindings : {
			items: 	"<",
			name: 	"<",
			desc: 	"<"
		}
	});


})();

