function A(input) {
  let count = 0;

  input.split('\n').forEach(string => {
    if (checkIdentity(string)) {
      count += 1;
    }
  })

  return count;
}

function checkIdentity(string) {
  return checkVowel(string) && checkDoubleLetter(string) && checkNotSpecialString(string);
}

function checkVowel(string) {
  const vowelList = ['a', 'e', 'i', 'o', 'u'];
  let count = 0;

  for (const char of string) {
    if (vowelList.includes(char)) {
      count += 1;

      if (count === 3) {
        return true;
      }
    }
  }

  return false;
}

function checkDoubleLetter(string) {
  for (let i=0; i < string.length-1; i++) {
    if (string[i+1] === string[i]) {
      return true;
    }
  }

  return false;
}

function checkNotSpecialString(string) {
  const specialCharList = ['a', 'c', 'p', 'x'];

  for (let i=0; i < string.length-1; i++) {
    if (specialCharList.includes(string[i]) && string[i+1] === String.fromCharCode(string[i].charCodeAt(0) + 1)) {
      return false;
    }
  }

  return true;
}
