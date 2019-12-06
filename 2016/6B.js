function B(input) {
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
    let min = Infinity;
    let minChar;
    const map = new Map();

    array[i].forEach(char => {
      if (!map.has(char)) {
        currentCount = 1;
      } else {
        currentCount = map.get(char) + 1;
      }

      map.set(char, currentCount);
    });

    for (const [key, value] of map) {
      if (value < min) {
        min = value;
        minChar = key;
      }
    }

    result = result.concat(minChar);
  }

  return result;
}
