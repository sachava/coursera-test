(function () {
	'use strict';

	angular.module('public').
	controller('MyinfoController', MyinfoController);

	MyinfoController.$inject = ['SignUpService', 'data2', 'ApiPath'];

	function MyinfoController(SignUpService, data2, ApiPath) {
		var MyinfoController = this;
		
		MyinfoController.first_name = SignUpService.first_name;
		MyinfoController.last_name = SignUpService.last_name;
		MyinfoController.email_address = SignUpService.email_address;
		MyinfoController.phone_number = SignUpService.phone_number;
		MyinfoController.menu_number = SignUpService.menu_number;
		MyinfoController.base_path = ApiPath;

		MyinfoController.data = data2.data;		
		console.log(data2.data);			
	}

})();