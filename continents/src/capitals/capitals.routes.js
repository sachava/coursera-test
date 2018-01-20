(function () {
   'use strict';

   angular.module('capitals').
   config(capitalsroutesconfig);

   capitalsroutesconfig.$inject= ['$stateProvider'];
   function capitalsroutesconfig ($stateProvider) {

   	  $stateProvider
        .state('home.countries', {
   	  	url: '/countries/:continent?variant',
   	  	templateUrl: 'src/capitals/capitals.main.html',
   	  	controller: 'CapitalsController',
   	  	controllerAs: 'capctrl',

   	  	resolve: {
            variant: ['$stateParams', 
                        function ($stateParams) {
                           return $stateParams.variant
                        }],

   	  		tests: ['CapitalsService', '$stateParams', 'config', function (CapitalsService, $stateParams, config) {
            //   console.log($stateParams)
   	  			return CapitalsService.getCapitals( $stateParams.continent,
                                                   $stateParams.variant, 
                                                   config)  //function (variant, DesirableNumberOfTest, quantOfVariants)
   	  		}]
   	  	}
   	  })
   }

}) ();