function A(input) {
  let count = 0;

  input.split('\n').forEach(string => {
    count += 2;

    for (let i=1; i<string.length-2; i++) {
      if (string[i] !== '\\') {
        continue;
      }

      if (string[i+1] === 'x' && i<string.length-4 && string[i+2].match(/[\da-f]/) && string[i+2].match(/[\da-f]/)) {
        count += 3;
        i += 3;
      } else {
        count += 1;
        i += 1;
      }
    }
  });

  return count;
}
