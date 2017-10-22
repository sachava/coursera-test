// component called categories that shows all available categories in the menu to the user

(function () {
	'use strict';

	angular.module('MenuApp').
	component('categories', {
		templateUrl: "src/menuapp/templates/categories.component.template.html",
		bindings : {
			categories: "<"
		}
	});


})();