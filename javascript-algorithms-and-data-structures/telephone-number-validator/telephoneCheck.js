function telephoneCheck(str) {
    // ^1? checks if the str starts with 1
    // \s? matches a zero or one spaces
    // (\((?=\d{3}\))\d{3}\)|\d{3}) checks whether the str is with () or not
    // (-|\s)? matches zero or one (space or dash)
    // \d{n} matches n consecutive digits
    return /^1?\s?(\((?=\d{3}\))\d{3}\)|\d{3})(-|\s)?\d{3}(-|\s)?\d{4}?$/.test(str);
  }