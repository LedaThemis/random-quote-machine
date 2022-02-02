function rot13(str) {
    let newStr = "";
    for (let i=0; i<str.length; i++) {
      if (str[i].match(/[A-Z]/)) {
        let charCode = str.charCodeAt(i);
        newStr += (charCode > 90-13) ?
         String.fromCharCode(((charCode+13) % 90) + (65-1)) :
         String.fromCharCode(((charCode+13) % 65) + (65));
      } else {
        newStr += str[i]
      }
    }
    return newStr;
  }

  // Explanation:
  // if num+13 > upperLimit(90 = Z)
  // we mod(num+13;upperLimit) to calculate by how much we exceeded upperLimit
  // then we add (lowerLimit(65 = A) to get the value of letter.