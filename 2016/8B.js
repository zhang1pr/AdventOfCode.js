function B(input) {
  const moves = [];
  const lights = Array(6).fill(0).map(() => Array(50).fill(0));

  input.split('\n').forEach(move => {
    const parts = move.split(' ');

    if (parts.length === 2) {
      const number1 = parseInt(parts[1].split('x')[0], 10);
      const number2 = parseInt(parts[1].split('x')[1], 10);

      moves.push([parts[0], number1, number2]);
    } else {
      moves.push([parts[0] + parts[1], parseInt(parts[2].split('=')[1], 10), parseInt(parts[4], 10)]);
    }
  });

  for (const move of moves) {
    if (move[0] === 'rect') {
      for (let y = 0; y < move[2]; y++) {
        for (let x = 0; x < move[1]; x++) {
          lights[y][x] = 1;
        }
      }
    } else if (move[0] === 'rotaterow') {
      const index = move[1];
      const diff = move[2];

      lights[index] = lights[index].slice(50-diff).concat(lights[index].slice(0, 50-diff));
    } else {
      const xIndex = move[1];
      const diff = move[2];
      const temp = [];

      for (let y=0; y<6; y++) {
        const yIndex = y - diff < 0 ? y - diff + 6 : y - diff;
        temp.push(lights[yIndex][xIndex]);
      }

      for (let y=0; y<6; y++) {
        lights[y][xIndex] = temp[y];
      }
    }
  }

  return lights.reduce((prev, curr) => {
    return prev + '\n' + curr.reduce((prev, curr) => {
      return prev + curr.toString();
    }, '');
  }, '').replace(/1/g, '#').replace(/0/g, ' ');
}
