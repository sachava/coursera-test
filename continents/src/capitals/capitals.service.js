(function () {
   'use strict';

   angular.module('capitals')
   .service('CapitalsService', CapitalsService);


  ////////////////////////////////////////
   CapitalsService.$inject = ['$http'];
   function CapitalsService ($http) {
   	var CapitalsService = this;
      ///////////////////////////////////
      function InitData (data, continent, variant, DesirableNumberOfTest, quantOfVariants, level) {
         var tests = [];
        // console.log(data);

         // определим какое количество вопросов будет, пользователь хочет DesirableNumberOfTest, но есть ли столько данных
         var NumberOfTest;
         var MaxNum;

         // фильтр по уровню сложности
           data = data.filter(function (element, index, array) {
                 // console.log(element)
                 return (Number(element.level) <= level)&&(element.continent === continent)
              });

         if (data.length > DesirableNumberOfTest) {
            NumberOfTest = DesirableNumberOfTest
            MaxNum = data.length;
         } else {
            NumberOfTest = data.length // больше, чем есть не получится
            // selectedQuest = все
            MaxNum = data.length;
         }
         //console.log("NumberOfTest", NumberOfTest)
    //   console.log(data);

         // получить массив от 1 до NumberOfTest случайных неповторяющихся чисел из диапазона 0..MaxNum
         var selectedNumbers = getSelectedNumbers(NumberOfTest, MaxNum); 
         // console.log('selectedNumbers=',selectedNumbers);

         var test;
         var varAnswers;
         var nOfAnswers;
         var var1;

         // сформировать массив вопросов и правильных ответов 
         for (var i = 0; i < selectedNumbers.length; i++) {
               test = {};
               var1 = [];
               test.id = data[selectedNumbers[i]].id;

               if (variant===0) {
                  test.quest = data[selectedNumbers[i]].country;
                  // test.rightAnswer = "правильный ответ";
                  test.rightAnswer = data[selectedNumbers[i]].capital;
                  
                  if ( (variant===0)&&(data[selectedNumbers[i]].hasOwnProperty('var1'))) {
                    // console.log(data[selectedNumbers[i]].var1);
                    var1 = data[selectedNumbers[i]].var1; 
                  };

               } else {
                if ((variant===1)||(variant===2)||(variant==3)) {
                  test.quest = data[selectedNumbers[i]].capital;
                  // test.rightAnswer = "правильный ответ";
                  test.rightAnswer = data[selectedNumbers[i]].country;
                }
                }
                  
               // varAnswers =[];
               varAnswers = var1.concat();
           //    console.log(varAnswers)
            // сколько - передается параметром в их число должен входить и rightAnswer
            // в ответах могут быть данные не только с selectedQuest
            // test.answers = ["ответ 1", "ответ 2"];
  

            if (varAnswers.length < quantOfVariants) {
                nOfAnswers = getSelectedNumbers(quantOfVariants - varAnswers.length, MaxNum ); // получили массив номеров вариантов ответа 
                for (var j=0; j < nOfAnswers.length; j++) {
                  if (variant===0) {
                   varAnswers.push(data[nOfAnswers[j]].capital)
                  } else {
                    if ((variant===1)||(variant===2)||(variant==3)) {
                      varAnswers.push(data[nOfAnswers[j]].country)
                    }
                  }
                }
            }

            var b = false;
            for (var j = 0; j < varAnswers.length; j++) {
              if (varAnswers[j] === test.rightAnswer) {
                b = true
              }
            }
            
            shuffle(varAnswers);  // перемешаем answers
            if (!b) {
               varAnswers[0] = test.rightAnswer;
            }

            // console.log(varAnswers)
            shuffle(varAnswers);  // перемешаем answers
            test.answers = varAnswers;

            // добавим в список тестов
            tests.push(test);
            
         }

         return tests;
      };
      ///////////////////////////
   	CapitalsService.getCapitals = function (continent, variantC, config) {
   		console.log('getCapitals', config, continent);

      var variant = Number(variantC);

   		return $http.get('data/capitals.json').then(function (response) {
   			// console.log(response.data);
            var tests = InitData( response.data,
                                  continent,  
                                  variant, 
                                  config.DesirableNumberOfTest, 
                                  config.quantOfVariants,
                                  config.level);
            return tests
   			// return response.data;
   		})
   	}


   }

}) ();