function A(input) {
  const set = new Set();

  let res1 = 0;
  let res3 = 0;

  input.split('\n').forEach(num => {
    set.add(Number(num));
  });

  const max = Math.max(...set);

  let i = 1;

  while (i < max) {
    if (set.has(i + 1)) {
      res1++;
      i++;
    } else if (set.has(i + 2)) {
      i += 2;
    } else {
      res3++;
      i += 3;
    }
  }

  return (res1 + 1) * (res3 + 1);
}
