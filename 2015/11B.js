function B(input) {
  while (!checkStraight(input) || checkSpecialLetter(input) || !checkDoubleLetter(input)) {
    input = increment(input);
  }

  input = increment(input);

  while (!checkStraight(input) || checkSpecialLetter(input) || !checkDoubleLetter(input)) {
    input = increment(input);
  }

  return input;
}

function increment(input) {
  for (let i = input.length-1; i >= 0; i--) {
    if (input[i] !== 'z') {
      return input.slice(0, i) + String.fromCharCode(input[i].charCodeAt(0)+1) + input.slice(i+1);
    } else {
      input = input.slice(0, i) + 'a' + input.slice(i+1);
    }
  }
}

function checkStraight(input) {
  for (let i = 0; i <input.length-2; i++) {
    if (
      input[i].charCodeAt(0) + 1 === input[i+1].charCodeAt(0)
      && input[i+1].charCodeAt(0) + 1 === input[i+2].charCodeAt(0)
    ) {
      return true;
    }
  }

  return false;
}

function checkSpecialLetter(input) {
  return input.includes('i') || input.includes('o') || input.includes('j');
}

function checkDoubleLetter(input) {
  let count = 0;

  for (let i = 0; i <input.length-1; i++) {
    if (input[i] === input[i+1]) {
      count += 1;
      i += 1;
    }

    if (count === 2) {
      return true;
    }
  }

  return false;
}
