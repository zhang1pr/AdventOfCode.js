function B(input) {
  const array = [];
  const set = new Set();
  let target = [];
  let group = 0;
  let checkpoint = 0;

  input.split('\n').forEach(line => {
    array.push(line.split(' <-> ')[1].split(', ').map(Number));
  });

  while (set.size !== array.length) {
    group++;

    if (target.length === 0) {
      for (let i = checkpoint; i < array.length; i++) {
        if (!set.has(i)) {
          target.push(i);
          checkpoint = i;
          break;
        }
      }
    }

    while (target.length !== 0) {
      const pipe = target.shift();

      if (!set.has(pipe)) {
        set.add(pipe);
        const connections = array[pipe];
        target = target.concat(connections);
      }
    }
  }

  return group;
}
