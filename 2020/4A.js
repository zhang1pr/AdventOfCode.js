function A(input) {
  let res = 0;
  const set = new Set();

  input.split('\n').forEach(line => {
    if (line) {
      const parts = line.split(' ').map(pair => pair.split(':'));

      for (const [a] of parts) {
        set.add(a);
      }
    } else {
      if (set.size == 8 || set.size == 7 && !set.has(`cid`)) {
        res++;
      }

      set.clear();
    }
  })

  return res;
}
