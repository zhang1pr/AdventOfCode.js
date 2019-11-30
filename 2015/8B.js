function B(input) {
  let count = 0;

  input.split('\n').forEach(string => {
    count += 4;

    for (let i=1; i<string.length-1; i++) {
      if (string[i] === '\"' || string[i] === '\\') {
        count += 1;
      }
    }
  });

  return count;
}
