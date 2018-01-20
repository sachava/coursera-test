(function (global) {

	//////////////////////////////////////////////////////////////////
   global.getSelectedNumbers = function (m, n) {
      // выбрать в случайном порядке массив m номеров от 0 до n -1
      var selectedNumbers = [];

      if (m > n) {
          console.log('How to choose '+ m + ' from '+ n + '?');
         new Error('Cannot take '+m + ' elements from '+ n);
         return nil;
      }

      // console.log('need to choose '+ m + ' from '+ n);
      for (var i = 0; i < m; i++) {
         // выбрать элемент
            var b = false;
            var x;  
                        
            while (!b) { 
                  // take random number
                    x = Math.floor(Math.random() * n);
                    // console.log('x=', x);
                  // проверить, что такого ещё нет в массиве
                     b = true;
                     for (var j = 0; j < selectedNumbers.length; j++) {
                        if (selectedNumbers[j] === x) {
                           b = false;
                        }
                     } 
            }
         // поместить в массив
         selectedNumbers.push(x);
      }
         
      return selectedNumbers
   }
   ///////////////////////////////////////////////////

    global.shuffle = function (a) {
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
    ///////////////////////////////////////////////////
    global.isValueInArray = function (value, arrayOfitems) {
      value = value.toLowerCase();
      for (var i = 0; i < arrayOfitems.length; i++) {
          if (arrayOfitems[i].toLowerCase() === value) {
            return true
          }
      }
      return false
    } 
    ///////////////////////////////////////////////////
    global.compareArrays = function (arr1, arr2) {
      arr1.sort();
      arr2.sort();
      if (arr1.length !== arr2.length) {
        return false
      }
  
      for (var i = 0; i < arr1.length; i++) {
        if (arr1[i]!==arr1[i]) {
          return false
        }
      }
      return true;
    }

})(window);