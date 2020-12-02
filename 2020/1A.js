function A(input) {
  const set = new Set();

  for (const n of input.split('\n').map(a => Number(a))) {
    if (set.has(2020 - n)) {
      return n * (2020 - n);
    } else {
      set.add(n);
    }
  }
}
