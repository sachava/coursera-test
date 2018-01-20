(function () {
	'use strict';

	angular.module('config').component('loading', {
		template: '<img src="img/spinner.svg" ng-if="$ctrl.show">',
		controller: LoadingController
	});

	LoadingController.$inject = ['$rootScope'];

	function LoadingController ($rootScope) {
		var LoadingController = this;
		var listener;

		LoadingController.$onInit = function () {
			LoadingController.show = false;
			listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
		}

		LoadingController.$onDestroy = function () {
			listener();
		}

		function onSpinnerActivate (event, data) {
			LoadingController.show = data.on;
		}
	}

})();