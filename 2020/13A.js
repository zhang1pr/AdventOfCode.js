function A(input) {
  const arr = input.split('\n')[1].split(',').filter(x => x != 'x').map(a => Number(a));

  const t = Number(input.split('\n')[0]);
  let min = Infinity;
  let id;

  for (const num of arr) {
    let temp = t;

    while (temp % num != 0) {
      temp++;
    }

    if (temp < min) {
      id = num;
      min = temp;
    }
  }

  return (min - t) * id;
}
