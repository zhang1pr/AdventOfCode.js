function B(input) {
  const set = new Set();
  const map = new Map();
  const array = [];

  input.split('\n').forEach(line => {
    const id = parseInt(line.split('@ ')[0].slice(1), 10);
    const part1 = line.split('@ ')[1];
    const part2 = part1.split(': ');
    const a = part2[0].split(',')[0];
    const b = part2[0].split(',')[1];
    const c = part2[1].split('x')[0];
    const d = part2[1].split('x')[1];

    array.push([id, a, b, c, d].map(Number));
    set.add(id);
  });

  for (const rectangle of array) {
    const id = rectangle[0];
    const xStart = rectangle[1];
    const yStart = rectangle[2];
    const xEnd = xStart + rectangle[3];
    const yEnd = yStart + rectangle[4];

    let flag = false;

    for (let x = xStart; x < xEnd; x++) {
      for (let y = yStart; y < yEnd; y++) {
        const string = x.toString() + ',' + y.toString();

        if (map.has(string)) {
          const anotherId = map.get(string);
          set.delete(anotherId);
          flag = true;
        } else {
          map.set(string, id);
        }
      }
    }

    if (flag) {
      set.delete(id);
    }
  }

  return [...set.values()][0];
}
