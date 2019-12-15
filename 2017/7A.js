function A(input) {
  const set = new Set();
  let result;
  const lines = input.split('\n');

  lines.forEach(line => {
    if (line.indexOf('->') === -1) {
      const top = line.split(' ')[0];
      set.add(top);
    } else {
      const tops = line.split('-> ')[1];
      tops.split(', ').forEach(top => {
        set.add(top);
      });
    }
  });

  lines.forEach(line => {
    if (line.indexOf('->') !== -1) {
      const bottom = line.split(' (')[0];
      if (!set.has(bottom)) {
        result = bottom;
      }
    }
  });

  return result;
}
