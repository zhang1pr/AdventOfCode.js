function B(input) {
  const map = new Map();
  map.set(0, [0]);
  const pointList = [[0, 0], [0, 0]];

  let count = 1;
  let index = 0;

  input.split('').forEach(step => {
    index = index % 2;
    point = pointList[index];

    switch(step) {
      case '>':
        point[0] += 1;
        break;
      case '<':
        point[0] -= 1;
        break;
      case '^':
        point[1] += 1;
        break;
      case 'v':
        point[1] -= 1;
    }

    if (!map.has(point[0])) {
      count += 1;
      map.set(point[0], [point[1]]);
    } else if (map.has(point[0]) && !map.get(point[0]).includes(point[1])) {
      count += 1;
      const value = map.get(point[0]);
      value.push(point[1]);
      map.set(point[0], value);
    }

    pointList[index] = point;
    index += 1;
  });

  return count;
}
