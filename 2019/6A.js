function A(input) {
  const map = new Map();
  let count = 0;

  input.split('\n').forEach(line => {
    const parts = line.split(')');

    if (map.has(parts[0])) {
      const value = map.get(parts[0]);
      value.push(parts[1]);

      map.set(parts[0], value);
    } else {
      map.set(parts[0], [parts[1]]);
    }
  });

  const queue = [['COM', 0]];

  while (queue.length > 0) {
    const target = queue.shift();
    count += getOrbitCount(target[1]);

    if (!map.has(target[0])) {
      continue;
    }

    const array = map.get(target[0]);

    array.forEach(element => {
      count -= getOrbitCount(target[1]);
      queue.push([element, target[1] + 1]);
    });
  }

  return count;
}

function getOrbitCount(number) {
  return number*(number+1)/2;
}
