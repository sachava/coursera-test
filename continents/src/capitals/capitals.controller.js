(function () {
   'use strict';

   angular.module('capitals').
   controller('CapitalsController', CapitalsController);

   CapitalsController.$inject = ['config', 'tests', 'variant'];

   function CapitalsController(config, tests, variantChar) {

   	 var CapitalsController = this;
     //  console.log(config);
   	 // console.log(tests);
       var variant = Number(variantChar);
       console.log('variant=', variant)
   	  
   	 CapitalsController.NumberOfAskedQuestions = 0;
   	 CapitalsController.RightAnswers = 0;
   	 CapitalsController.WrongAnswers = [];
	     CapitalsController.buttonName = 'Далее';

        CapitalsController.variant = variant;

        if (variant===0) {
   	        CapitalsController.question = 'Какая столица государства ' + tests[0].quest + '?'
   	  } else {
            if (variant===1) {
               CapitalsController.question = 'У какого государства столица ' + tests[0].quest + '?'
            } else if (variant===2) {
               CapitalsController.question = 'Какое это государство?'
               CapitalsController.image ='img/maps/'+tests[0].id + '.svg';
               // console.log(CapitalsController.image)
            } else if (variant===3) {
               CapitalsController.question = 'Какого государства этот флаг?'
               CapitalsController.image ='img/flags/'+tests[0].id + '.svg';
               // console.log(CapitalsController.image)
            }
        }

       CapitalsController.answers = tests[0].answers;
   	 CapitalsController.visible = true;

   	 CapitalsController.proc = function () {
		    return Math.round((CapitalsController.RightAnswers / CapitalsController.NumberOfAskedQuestions)*100);
	     }

   	 CapitalsController.nextButtonClick = function () {
   	 	if (CapitalsController.variantName === tests[CapitalsController.NumberOfAskedQuestions].rightAnswer) {
   	 		// правильный ответ
   	 		CapitalsController.RightAnswers ++;

   	 	} else  {
   	 		// wrong answer
   	 		CapitalsController.WrongAnswers.push(tests[CapitalsController.NumberOfAskedQuestions]);
   	 	}

   	 	CapitalsController.NumberOfAskedQuestions++;
   	 	if (CapitalsController.NumberOfAskedQuestions<tests.length) {
   	 		// drawning next quest
  
              if (variant===0) {
                CapitalsController.question = 'Какая столица государства ' + tests[CapitalsController.NumberOfAskedQuestions].quest + '?'
                 } else {
                     if (variant===1) {
                        CapitalsController.question = 'У какого государства столица ' + tests[CapitalsController.NumberOfAskedQuestions].quest + '?'
                     } else {
                        if (variant===2) {
                           CapitalsController.image ='img/maps/'+tests[CapitalsController.NumberOfAskedQuestions].id + '.svg';
                        } else if (variant===3) {
                            CapitalsController.image ='img/flags/'+tests[CapitalsController.NumberOfAskedQuestions].id + '.svg';
                        }
                     }
                 }

   	 		CapitalsController.answers = tests[CapitalsController.NumberOfAskedQuestions].answers;
   	 		CapitalsController.variantName = '';
   	 	} else {
   	 		//drawning result
   	 		CapitalsController.visible = false
            // console.log(CapitalsController.WrongAnswers)
   	 	}
   	 	// console.log( CapitalsController.variantName)
   	 };



   	 
   }

}) ();