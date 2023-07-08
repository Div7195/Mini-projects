function appendToInputBox(value) {
    var inputBox = document.getElementById('inputBox');
    inputBox.value += value;
  }
  
  function deleteInputBox() {
    var inputBox = document.getElementById('inputBox');
  
    inputBox.value = inputBox.value.slice(0, -1);
  }


  function calResult() {
    var inputBox = document.getElementById('inputBox');
    var resultBox = document.getElementById('resultBox');
    var inputExpression = inputBox.value;
  

    
  try {
      var temp = inputExpression;
      if (temp.includes('√')) {
        while (temp.includes('√')){
          var rootI = temp.indexOf('√');
          var numEndI = rootI + 1;
          while (numEndI < temp.length && !isNaN(parseFloat(temp[numEndI]))) {
            numEndI++;
          }
          var num = temp.slice(rootI + 1, numEndI);
          temp = temp.slice(0, rootI) + `Math.sqrt(${num})` + temp.slice(numEndI);
        }
        inputExpression = temp;
      }
  
      var ans = eval(inputExpression);
      resultBox.value = ans;
    } catch (error) {
      resultBox.value = 'Your input is not correct';
    }
  }
  function clearBothBox() {
    var inputBox = document.getElementById('inputBox');
    var resultBox = document.getElementById('resultBox');
    inputBox.value = '';
    resultBox.value = '';
  }
  
  
  
  