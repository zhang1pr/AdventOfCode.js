function A(input) {
  let string = input;
  let result;
  let count;
  let letter;

  for (let i=0; i<40; i++) {
    string = result || input;
    result = '';

    count = 0;
    letter = null;

    for (let i=0; i<string.length; i++) {
      if (letter == null) {
        count += 1;
        letter = string[i];
      } else if (string[i] === letter) {
        count += 1;
      } else {
        result = result + count.toString() + letter;
        letter = string[i];
        count = 1;
      }

      if (i === string.length-1) {
        result = result + count.toString() + letter;
      }
    }
  }

  return result.length;
}
