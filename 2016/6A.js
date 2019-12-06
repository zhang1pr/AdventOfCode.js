function A(input) {
  const array = [];
  let result = '';

  input.split('\n').forEach(line => {
    [...line].forEach((char, index) => {
      if (!array[index]) {
        array[index] = [];
      }

      array[index].push(char);
    });
  });

  for (let i=0; i<array.length; i++) {
    let max = 0;
    let maxChar;
    let currentCount;
    const map = new Map();

    array[i].forEach(char => {
      if (!map.has(char)) {
        currentCount = 1;
      } else {
        currentCount = map.get(char) + 1;
      }

      map.set(char, currentCount);

      if (currentCount > max) {
        max = currentCount;
        maxChar = char;
      }
    });

    result = result.concat(maxChar);
  }

  return result;
}
