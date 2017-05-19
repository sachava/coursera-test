(function (){

'use strict';

 angular.module('appCountries',[])
		.controller('CountryController',CountryController)
		.service('CountryService',CountryService);

CountryController.$inject =['CountryService'];
function CountryController(CountryService){
	var cc=this;
 
	cc.question = "Are you ready to take the test for knowledge of the capitals of countries?";

	// cc.variants  = [ {name: "country1"}, 
	// 				 {name: "country2"}, 
	// 				 {name: "country3"}
	// 				 ];

	// cc.variantName = "country1";

	cc.variants =[];
	cc.variantName = "";
	cc.buttonName = "Start test";
	cc.showRes = false;
	cc.total =  0;
	cc.rightAnswers = 0;
	cc.countryName = 0;
	cc.repeat =[];

	cc.proc = function () {
		return Math.round((cc.rightAnswers / cc.total)*100);
	}

	cc.proc_class = function () {
		var x = cc.proc();
		console.log("%="+x);
		if (x > 75) {
			return "green";
		}
		else {
			return "red";
		}
	}

	cc.getCurrentQuestNum = function () {
		return CountryService.getQuestNum(); 
	}

	cc.nextQuest = function () {
	    // CountryService.nextQuest(); 
		if (cc.buttonName === "Start test") {
				cc.buttonName = "Next";
				cc.total =  CountryService.number_of_quests();
		}

		var i = CountryService.getQuestNum();
		console.log("#" +i + " " + cc.countryName + " =>" + cc.variantName ); 

		// console.log('CountryService.getRightAnswer(cc.countryName)='+CountryService.getRightAnswer(countryName));
		// console.log('cc.variantName='+cc.variantName )
		if ((i>0) && (cc.countryName != undefined)) {
			 if  (CountryService.getRightAnswer(cc.countryName) === cc.variantName ) {
					cc.rightAnswers++;
				    // console.log(cc.rightAnswers);
			} else {
				cc.repeat.push(cc.countryName);
			}
		}



		if (CountryService.getQuestNum() < CountryService.number_of_quests()) {
			CountryService.nextQuest();
			cc.countryName = CountryService.getName();
			cc.question = "What is the capital of " + cc.countryName + "?";
			cc.variants = CountryService.getChoices(cc.countryName);
			
		} else {
			// show results boolean
			cc.showRes = true;
			cc.question = "Your results:"
			cc.variants = [];
			cc.buttonName = "Retake test";
		}
	};
};

CountryService.$inject =['$http'];
function CountryService($http, number_of_choices){
	var countries =[
	// "Канада", "США", "Мексика", "Куба", "Аргентина", "Бразилия", "Чили", "Уругвай", "Колумбия", "Эквадор",
	// "Египет","Судан","ДРК", "Ангола", "ЮАР", "Мадагаскар", "Марокко", "Сомали", "Ливия", "Намибия",
	// "Австралия","Индонезия","Филиппины","Япония","Тайланд","Китай","Монголия",
	// "Казахстан","Иран","Ирак","Турция","Саудовская Аравия",
	// "Афганистан", "Пакистан",
	// "Испания", "Франция","Великобритания","Ирландия", "Германия",
	// "Швеция","Норвегия", "Финляндия","Бельгия","Исландия", "Италия",
	// "Греция", "Румыния", "Польша", "Чехия",
	// "Белоруссия", "Молдова", "Литва"
	];
	var capitals =[
	// "Оттава", "Вашингтон", "Мехико", "Гавана", "Буэнос-Айрес", "Бразилиа", "Сантьяго", "Монтевидео","Богота", "Кито",
	// "Каир", "Хартум", "Киншаса", "Луанда", "Претория", "Антананариву", "Рабат", "Могадишо", "Триполи", "Виндхук",
	// "Канберра", "Джакарта", "Манила", "Токио", "Бангкок", "Пекин", "Улан-Батор", 
	// "Астана", "Тегеран", "Багдад", "Анкара", "Эр-Рияд",
	// "Кабул", "Исламобад",
	// "Мадрид", "Париж", "Лондон", "Дублин", "Берлин",
	// "Стокгольм", "Осло", "Хельсинки", "Брюссель", "Рейкьявик", "Рим",
	// "Афины", "Бухарест", "Варшава", "Прага",
	// "Минск", "Кишинёв", "Вильнюс"
	];
	var CountryService=this;
	var questNum = 0;
	var wereAsked = [];
	var total_quest_setting = null;
	var number_of_choices = 4;
	var rightAnswersArray =[];

	$http({
		method: "GET",
		url: 	"data/countries.json"
	}).then( function init(response) {
				var x = response.data; 
				for (var i=0; i<x.length; i++) {
					if ( (x[i].country !== undefined) && (x[i].country !== null) &&
						 (x[i].capital !== undefined) && (x[i].capital !== null)) {
						countries.push(x[i].country);
						capitals.push(x[i].capital);
						rightAnswersArray.push(x[i].capital);
						
						for (var i=0;i<countries.length;i++){
							wereAsked.push(false);
						};
					}

				}
				// console.log(countries);
				// console.log(capitals)
			},
			function error(response) {
				console.log('Ошибка при загрузке данных!')
			});
	$http({
		method: "GET",
		url: 	"data/settings.json"
	}).then(	function settings(response) {
						if ((response.data.total_quest !== undefined) && (response.data.total_quest !== null)) {
							total_quest_setting = response.data.total_quest;
						};
						if ((response.data.quantity_per_quest !== undefined) && (response.data.quantity_per_quest !== null)) {
							number_of_choices = response.data.quantity_per_quest;
						};
						
						if (response.data.total_quest > countries.length) {
							total_quest_setting = countries.length;	
						} else {
							var total = countries.length;
							var n = total_quest_setting;
							console.log("capitals = "+capitals);

							for (var i=0; (i < (total-n-1)); i++) {
								var r = Math.floor((Math.random() * (total-i)) + 1 );
								//array.splice( index, 1 );
								countries.splice(r, 1);
								rightAnswersArray.splice(r, 1);
							}
							console.log("capitals = "+capitals);
							console.log("total=" + total);
							console.log("n=" + n);
							
						}

					}, 
					function errorsetting(response) { 
						console.log('Ошибка начальной инициализации!')
					});


    CountryService.number_of_quests = function () { 
    									return (total_quest_setting || countries.length)
    								  }; 

	CountryService.getQuestNum = function () {
		return questNum
	};

       
    CountryService.nextQuest = function () {
    	questNum +=1;
    };


    var shuffle = function (a) {
		/** Shuffles array in place.
 		* @param {Array} a items The array containing the items.*/
    	var j, x, i;
	    
	    for (i = a.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	    return a;
    }


    CountryService.getName = function () {
    	var left = CountryService.number_of_quests() - questNum + 1; // left unasked
    	var r = Math.floor((Math.random() * left) + 1 );
       	// floor(x) rounded x downward to the nearest integer 
    	// random() returms random number between o and 1
    	var ind = 0;
    	var quant_of_not_asked = 0;
    	var r_ind = -1;
    	// search for index of r not asked question
    	while ((ind< wereAsked.length) && (r_ind == -1)) {
            if (wereAsked[ind] === false) { // this number in array was not asked
            	quant_of_not_asked++;
            	if (r === quant_of_not_asked) {
            		r_ind = ind; 
            		wereAsked[r_ind] = true;     
            	}
            };
            ind++;
    	}

  //   	console.log("left="+ left);
  //   	console.log("r="+ r);
  //   	console.log("wereAsked="+ wereAsked); 	
		// console.log("r_ind="+ r_ind); 	
    	return countries[r_ind];
    }

    CountryService.getRightAnswer = function (country) {
    	var i = countries.indexOf(country);
    	return rightAnswersArray[i];
    }

    CountryService.getChoices = function (countryName) {
    // надо создать и вернуть массив arr с названиями столиц (из массива capitals)
    // в этом массиве arr должна быть столица countryName
    // количество элементов массива = глобальной константе number_of_choices
    	var arr = [];
  		
  		// первым добавим столицу выбранного гос-ва  	
    	arr.push({name: 
    				capitals[countries.indexOf(countryName)]
    			});
        

        // доберём ещё (number_of_choices-1) элементов 
        var capitals_already_in_array = [];

        for (var i=0; (i<capitals.length); i++) {
        	capitals_already_in_array[i] = false;        	
        };	
        capitals_already_in_array[countries.indexOf(countryName)] = true;
        var were_taken = 1;
      
        while (were_taken < number_of_choices) {
        	// случайный номер по порядку из количества ещё невыбранных
    		var r = Math.floor( (Math.random() * (countries.length - were_taken)) + 1 );
    		// console.log("r="+r);
    		// console.log("were_taken="+were_taken);
    		// console.log("capitals_already_in_array="+capitals_already_in_array);
    		
    		var k = 0;  // будем считать невыбранные в массиве
			var r_ind = -1;
			var i = 0;  // current position in array of capitals
			while ((i<=countries.length) && (r_ind==-1))  {
				// console.log('i='+i);
				// console.log(capitals_already_in_array[i]);
				if (capitals_already_in_array[i] === false) {
					k++;
					// console.log('k='+k);
					if (k == r) {
						capitals_already_in_array[i] = true;
						r_ind = i;
					}
				};

				i++;
			};
    		arr.push(
    					{name: 
    						capitals[r_ind]
    					}
    				);
    		were_taken++;
    	};

    	// перемешаем массив объектов

    	return shuffle(arr);

    };

};

// Канада
// США
// Мексика
// Куба
// Аргентина
// Бразилия
// Чили
// 
// Египет
// Судан
// ДРК
// Ангола
// ЮАР
// Мадагаскар
// Австралия
// Индонезия
// Филиппины
// Япония
// Тайланд
// Китай
// Монголия
// Индонезия
// Казахстан
// Иран
// Ирак
// Турция
// Саудовская Аравия
// Испания
// Франция
// Великобритания
// Швеция
// Норвегия
// Финляндия
// Бельгия
// Испания
// Италия


})();