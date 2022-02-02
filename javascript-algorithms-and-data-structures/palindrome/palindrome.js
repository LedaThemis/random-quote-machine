function palindrome(str) {
    str = str.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
    return str === str.split("").reverse().join("");
  }