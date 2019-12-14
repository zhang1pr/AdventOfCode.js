function A(input) {
  let twoCount = 0;
  let threeCount = 0;

  input.split('\n').forEach(line => {
    const map = new Map();

    [...line].forEach(letter => {
      if (map.has(letter)) {
        map.set(letter, map.get(letter)+1);
      } else {
        map.set(letter, 1);
      }
    })

    if ([...map.values()].includes(2)) {
      twoCount += 1;
    }

    if ([...map.values()].includes(3)) {
      threeCount += 1;
    }
  });

  return twoCount * threeCount;
}
