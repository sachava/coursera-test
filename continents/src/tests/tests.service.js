(function () {
   'use strict';

   angular.module('capitals')
   .service('TestsService', TestsService);

//////////////////////////////////////////////////////////////////
      ///////////////////////////
  TestsService.$inject = ['$http'];

  function TestsService ($http) {
    var TestsService = this; 
   	
    TestsService.getTests = function (section, topic, config) {
   		// console.log('getTests');
      function InitData (data, section, topic, config) {
        var tests = [];
      //    console.log("data=", data, "section=",section, "topic=",topic, "config=",config)

        tests = data.filter(function (element, index, array) {
                 // console.log(element)
                 return (Number(element.level) <= config.level)&&(element.section === section)&&(element.topic === topic)
              });

        return tests
      }

   		return $http.get('data/test_geogr_continents.json').then(function (response) {

            var tests = InitData( response.data,
                                  section, 
                                  topic,
                                  config);

            return tests
   		})
   	}


   }

}) ();