(function () {
  'use strict';
  
   angular.module('spinner').
   controller('spinnerController', spinnerController);

   spinnerController.$inject = ['$rootScope'];

   function spinnerController ($rootScope) {
   	var spinnerController = this;
   	var cancellers = [];
   	spinnerController.showSpinner = false;

   	spinnerController.$onInit = function () {
   		 // console.log('Controller Init!')
   	   	// console.log($rootScope.$$listeners)
   	   	var cancel = $rootScope.$on('$stateChangeStart', 
							   		function(event, toState, toParams, fromState, fromParams, options) {
										spinnerController.showSpinner = true; 
										// console.log("spinnerController.showSpinner = "+ spinnerController.showSpinner)  		   
							   		});
   		cancellers.push(cancel);
   		// console.log(cancel);

   		cancel = $rootScope.$on('$stateChangeSuccess', 
   								 function (event, toState, toParams, fromState, fromParams) {
   									spinnerController.showSpinner = false;  
   									// console.log("spinnerController.showSpinner = "+ spinnerController.showSpinner)   		   
   								});
   		cancellers.push(cancel);

   		cancel = $rootScope.$on('$stateChangeError', 
   								 function (event, toState, toParams, fromState, fromParams, error) {
   									spinnerController.showSpinner = true; 
   									// console.log("spinnerController.showSpinner = "+ spinnerController.showSpinner)    		   
   								});
   		cancellers.push(cancel);
   	}
   	spinnerController.$onDestroy = function () {
   		cancellers.forEach(function (item) {
   			item();
   		})
   	}
   };
   
})();