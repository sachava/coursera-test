(function () {
	'use strict';

	angular.module('public').
	controller('SignUpController', SignUpController);

	SignUpController.$inject =['SignUpService', 'MenuService'];

	function SignUpController (SignUpService, MenuService) {
		var SignUpController = this;
		SignUpController.first_name = "";
		SignUpController.last_name = "";
		SignUpController.email_address = "";
		SignUpController.phone_number = "";
		SignUpController.menu_number = "";
		
		SignUpController.menu_number_exists = true;
		SignUpController.saved = false;

		SignUpController.go = function () {
			var d = MenuService.getMenuItem(SignUpController.menu_number)    
					.then(  function (response) {
								SignUpController.menu_number_exists = true;
								var obj = {};
								obj.first_name = SignUpController.first_name;
								obj.last_name = SignUpController.last_name;
								obj.email_address = SignUpController.email_address; 
								obj.phone_number = SignUpController.phone_number;
								obj.menu_number = SignUpController.menu_number;
								SignUpService.saveInfo(obj);

								SignUpController.saved = true;
              					return response.data;
            					},
            				function (error) {
            					SignUpController.menu_number_exists = false;
              					return 'error'
            				});
		};

	}

})();