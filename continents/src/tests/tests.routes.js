(function () {
   'use strict';

   angular.module('tests').
   config(testsroutesconfig);

   testsroutesconfig.$inject= ['$stateProvider'];
   function testsroutesconfig ($stateProvider) {

   	  $stateProvider
        .state('home.tests', {
   	  	url: '/test/:continent?topic',
   	  	templateUrl: 'src/tests/tests.main.html',
   	  	controller: 'TestsController',
   	  	controllerAs: 'tctrl',

   	  	resolve: {
          section:  ['$stateParams', function ($stateParams) {
                      return $stateParams.continent;
                    }],

   	  		tests: ['TestsService', '$stateParams', 'config',  function (TestsService, $stateParams, config) {
                        //   console.log($stateParams)
   	  		           return TestsService.getTests(
                                        $stateParams.continent,
                                        $stateParams.topic,
                                        config) 
   	  		}]
   	  	}
   	  })
   }

}) ();