function B(input) {
  const directions = [];
  let point = [0, 0];
  let points = [[0, 0]];
  let compass = 0;

  input = input.split(', ').forEach(instruction => {
    directions.push([instruction[0], parseInt(instruction.slice(1), 10)]);
  });

  for (const direction of directions) {
    if (direction[0] === 'R') {
      compass++;

      if (compass > 3) {
        compass = 0;
      }
    } else {
      compass--;

      if (compass < 0) {
        compass = 3;
      }
    }

    switch (compass) {
      case 0:
        point[0] += direction[1];
        break;
      case 1:
        point[1] += direction[1];
        break;
      case 2:
        point[0] -= direction[1];
        break;
      case 3:
        point[1] -= direction[1];
    }

    points.push(point.slice());

    for (i = 0; i < points.length-3; i++) {
      point1a = points[i];
      point1b = points[i+1];
      point2a = points[points.length-2];
      point2b = points[points.length-1];

      if (
        (point1a[0] <= point2a[0] && point1a[0] >= point2b[0])
        || (point1a[0] >= point2a[0] && point1a[0] <= point2b[0])
      ) {
        if (
          (point2a[1] <= point1a[1] && point2a[1] >= point1b[1])
          || (point2a[1] >= point1a[1] && point2a[1] <= point1b[1])
        ) {
          return Math.abs(point1a[0]) + Math.abs(point2a[1]);
        }
      } else {
        if (
          (point1a[1] <= point2a[1] && point1a[1] >= point2b[1])
          || (point1a[1] >= point2a[1] && point1a[1] <= point2b[1])
        ) {
          if (
            (point2a[0] <= point1a[0] && point2a[0] >= point1b[0])
            || (point2a[0] >= point1a[0] && point2a[0] <= point1b[0])
          ) {
            return Math.abs(point1a[1]) + Math.abs(point2a[0]);
          }
        }
      }
    }
  }
}
