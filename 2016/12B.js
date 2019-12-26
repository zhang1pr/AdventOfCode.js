function A(input) {
  const map = new Map();
  const registers = ['a', 'b', 'c', 'd'];
  registers.forEach(r => map.set(r, 0));
  map.set('c', 1);

  const instructions = [];

  input.split('\n').forEach((line) => {
    instructions.push(line.split(' '));
  });

  for (let i = 0; i < instructions.length; i++) {
    const current = instructions[i];
    const move = current[0];
    let target1 = current[1];
    let target2 = current[2];

    switch (move) {
      case 'cpy':
        map.set(target2, parseInt(target1) || map.get(target1));
        break;
      case 'inc':
        map.set(target1, map.get(target1) + 1);
        break;
      case 'dec':
        map.set(target1, map.get(target1) - 1);
        break;
      case 'jnz':
        if (map.get(target1) !== 0) {
          i += parseInt(target2) - 1;
        }
    }
  }

  return map.get('a');
}
