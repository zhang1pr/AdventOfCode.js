function A(input) {
  let string = input.toString();

  while (string.length < 272) {
    let anotherString = [...string].reverse().map(char => {
      if (char === '0') {
        return '1';
      } else {
        return '0';
      }
    }).join('');

    string += '0' + anotherString;
  }

  string = string.slice(0, 272);

  while (string.length % 2 !== 1) {
    let newString = '';

    for (let i = 0; i < string.length; i+=2) {
      if (string[i] === string[i+1]) {
        newString += '1';
      } else {
        newString += '0';
      }
    }

    string = newString;
  }

  return string;
}
