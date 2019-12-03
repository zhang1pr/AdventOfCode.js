function A(input) {
  const directions = [];
  let point = [0, 0];
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
  }

  return Math.abs(point[0]) + Math.abs(point[1]);
}
