function A(input) {
  const oneSet = new Set();
  const twoSet = new Set();
  const array = [];

  input.split('\n').forEach(line => {
    const part1 = line.split('@ ')[1];
    const part2 = part1.split(': ');
    const a = part2[0].split(',')[0];
    const b = part2[0].split(',')[1];
    const c = part2[1].split('x')[0];
    const d = part2[1].split('x')[1];

    array.push([a, b, c, d].map(Number));
  });

  for (const rectangle of array) {
    const xStart = rectangle[0];
    const yStart = rectangle[1];
    const xEnd = xStart + rectangle[2];
    const yEnd = yStart + rectangle[3];

    for (let x = xStart; x < xEnd; x++) {
      for (let y = yStart; y < yEnd; y++) {
        const string = x.toString() + ',' + y.toString();

        if (oneSet.has(string)) {
          twoSet.add(string);
        } else {
          oneSet.add(string);
        }
      }
    }
  }

  return twoSet.size;
}
