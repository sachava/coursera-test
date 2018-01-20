(function () {
   'use strict';

   angular.module('tests').
   controller('TestsController', TestsController);

   TestsController.$inject = ['section', 'tests'];

   function TestsController(section, tests) {

    var TestsController = this;

        function initializeQuestion (num) {
           if (num < tests.length) {
                  TestsController.type = tests[num].type;
                  TestsController.question = tests[num].question;
                // shuffle
                  TestsController.answers = shuffle(tests[num].answers);
                  TestsController.right_answer = tests[num].right_answer; 
                  TestsController.variantName = "";
              
                  if ((tests[num].image) && (tests[num].image!="")) {
                    TestsController.image = tests[num].image
                  } else {
                    TestsController.image = "";
                  }
           }
        }

    tests = shuffle(tests);
    
    TestsController.topic = "";
    if (section === 'South_America'){
      TestsController.topic = "Южная Америка"
    }
    TestsController.section = section;
    TestsController.NumberOfAskedQuestions = 0;
  TestsController.RightAnswers = 0;
    TestsController.WrongAnswers = [];
    TestsController.buttonName = 'Далее';
    TestsController.comboVariants = [];
    var comboVariantsNames = [];

    TestsController.Points = 0;
    TestsController.TotalPoints = 0;
    TestsController.visible = true;

     TestsController.proc = function () {
        var r;
        if (TestsController.TotalPoints===0) {
          r = "-";
        } else {
          r = Math.round((TestsController.Points / TestsController.TotalPoints)*100);
        }
        return r;
      }

      initializeQuestion(0);

      var rightAnswerCheck = function (isAnswerRight) {
          if (isAnswerRight) {
              // правильный ответ
                TestsController.RightAnswers ++;  
              // points
                TestsController.Points += Number(tests[TestsController.NumberOfAskedQuestions].weight);
          } else  {
                  // wrong answer
                  TestsController.WrongAnswers.push(tests[TestsController.NumberOfAskedQuestions]);
                }
      };

      TestsController.nextButtonClick = function () {

          TestsController.TotalPoints += Number(tests[TestsController.NumberOfAskedQuestions].weight);
          if (TestsController.type =="0") {  // radio
             rightAnswerCheck(TestsController.variantName === tests[TestsController.NumberOfAskedQuestions].right_answer[0]);
          } else if (TestsController.type =="1") { // edit
             rightAnswerCheck(isValueInArray( TestsController.variantName, 
                                              tests[TestsController.NumberOfAskedQuestions].right_answer)) 
          } else if (TestsController.type =="2") { //combo
              // console.log(TestsController.comboVariants)
              comboVariantsNames = [];
              for (var j = 0; j<TestsController.comboVariants.length; j++) {
                if (TestsController.comboVariants[j]) {
                  comboVariantsNames.push(TestsController.answers[j]);
                }
              }
              rightAnswerCheck(compareArrays(comboVariantsNames,tests[TestsController.NumberOfAskedQuestions].right_answer));
              TestsController.comboVariants = [];
             // console.log(comboVariantsNames)
          };
          // console.log(TestsController.type );

        TestsController.NumberOfAskedQuestions++;
        if (TestsController.NumberOfAskedQuestions<tests.length) {
            // drawning next quest
            initializeQuestion(TestsController.NumberOfAskedQuestions);     
        } else {
            TestsController.visible = false
            //console.log(TestsController.WrongAnswers);
        };
          
      };
        

   }

}) ();