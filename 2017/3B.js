function A(number) {
  const map = new Map();
  map.set('0,0', 1);
  const position = [0, 0];
  const directions = ['R', 'U', 'L', 'D'];
  let direction = 'R';
  let layer = 1;
  let step = layer;
  let count = 2;

  while (true) {
    switch (direction) {
      case 'R':
        position[0] += 1;
        break;
      case 'L':
        position[0] -= 1;
        break;
      case 'U':
        position[1] += 1;
        break;
      case 'D':
        position[1] -= 1;
    }

    step--;

    if (step === 0) {
      count--;

      let directionIndex = directions.indexOf(direction);
      if (directionIndex === 3) {
        directionIndex = -1;
      }
      direction = directions[directionIndex + 1];

      if (count === 0) {
        layer += 1;
        count = 2;
      }
      step = layer;
    }

    const x = position[0];
    const y = position[1];

    let result = 0;
    for (let i=x-1; i<= x+1; i++) {
      for (let j=y-1; j<= y+1; j++) {
        if (map.has(`${i},${j}`)) {
          result += map.get(`${i},${j}`);
        }
      }
    }

    if (result > number) {
      return result;
    } else {
      map.set(position.join(','), result);
    }
  }
}
