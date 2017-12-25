(function () {
	'use strict';

	angular.module('public').
	service('SignUpService', SignUpService);

	function SignUpService () {
		var SignUpService = this;
		SignUpService.first_name = "";
		SignUpService.last_name = "";
		SignUpService.email_address = "";
		SignUpService.phone_number = "";
		SignUpService.menu_number = "";

		SignUpService.saveInfo = function (obj) {
			SignUpService.first_name = obj.first_name;
			SignUpService.last_name = obj.last_name;
			SignUpService.email_address = obj.email_address;
			SignUpService.phone_number = obj.phone_number;
			SignUpService.menu_number = obj.menu_number;			
		}				
	}

})();