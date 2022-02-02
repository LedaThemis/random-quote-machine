function convertToRoman(num) {
    const ROMAN = {
      1000: "M",
      500 : "D",
      100 : "C",
      50  : "L",
      10  : "X",
      5   : "V",
      1   : "I"
    }
   let ones = num % 10;
   let tens = ((num % 100) - (num % 10))/10;
   let hundreds = ((num % 1000) - (num % 100))/100
   let thousands = ((num) - (num % 1000))/1000
  
  function process_roman(n, choice) {
  
    if (n < 4) {
      return ROMAN[choice].repeat(n);
    } else if (n == 4) {
      return ROMAN[choice] + ROMAN[5*choice];
    } else if (n == 5) {
      return ROMAN[5*choice];
    } else if (n > 5 && n < 9) {
      return ROMAN[5*choice] + ROMAN[choice].repeat(n-5);
    } else if (n == 9) {
      return ROMAN[choice] + ROMAN[(n+1)*choice];
    } else {
      return "";
    }
  }
    return ROMAN[1000].repeat(thousands) + process_roman(hundreds,100) + process_roman(tens,10) + process_roman(ones,1);
  
  }