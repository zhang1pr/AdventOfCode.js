function B(input) {
  const map = new Map();
  const distance = new Map();

  input.split('\n').forEach(line => {
    const parts = line.split(')');

    if (map.has(parts[0])) {
      const value = map.get(parts[0]);
      value.push(parts[1]);

      map.set(parts[0], value);
    } else {
      map.set(parts[0], [parts[1]]);
    }

    if (map.has(parts[1])) {
      const value = map.get(parts[1]);
      value.push(parts[0]);

      map.set(parts[1], value);
    } else {
      map.set(parts[1], [parts[0]]);
    }
  });

  const neighborQueue = ['YOU'];
  distance.set('YOU', -1);

  while (true) {
    const target = neighborQueue.shift();
    const step = distance.get(target);
    const array = map.get(target);

    if (array.includes('SAN')) {
      return step;
    }

    array.forEach(element => {
      if (!distance.has(element)) {
        distance.set(element, step+1);
        neighborQueue.push(element);
      }
    });
  }
}
