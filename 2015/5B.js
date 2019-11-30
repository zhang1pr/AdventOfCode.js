function B(input) {
  let count = 0;

  input.split('\n').forEach(string => {
    if (checkIdentity(string)) {
      count += 1;
    }
  })

  return count;
}

function checkIdentity(string) {
  return checkPair(string) && checkRepeatLetter(string);
}

function checkPair(string) {
  const set = new Set();

  for (let i=0; i < string.length-1; i++) {
    if (set.has(string[i] + string[i+1])) {
      return true;
    } else {
      set.add(string[i] + string[i+1]);
    }

    if (i < string.length-2 && string[i] === string[i+1] && string[i+1] === string[i+2]) {
      i += 1;
    }
  }

  return false;
}

function checkRepeatLetter(string) {
  for (let i=0; i < string.length-2; i++) {
    if (string[i+2] === string[i]) {
      return true;
    }
  }

  return false;
}
