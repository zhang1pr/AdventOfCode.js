function A(input) {
  const array = [];
  const set = new Set();
  let target = [0];

  input.split('\n').forEach(line => {
    array.push(line.split(' <-> ')[1].split(', ').map(Number));
  });

  while (target.length !== 0) {
    const pipe = target.shift();

    if (!set.has(pipe)) {
      set.add(pipe);
      const connections = array[pipe];
      target = target.concat(connections);
    }
  }

  return set.size;
}
