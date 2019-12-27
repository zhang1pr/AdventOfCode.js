function B(input) {
  const discs = [];
  let result = 0;
  let total = 1;

  input.split('\n').forEach(line => {
    const disc = [];
    const parts = line.split(' ');

    const position = parseInt(parts[3], 10);
    const at = parseInt(parts[parts.length-1]);

    disc.push(position, at);
    discs.push(disc);
  });

  discs.push([11, 0]);

  for (let i = 0; i < discs.length; i++) {
    disc = discs[i];
    disc[1] += (i + 1) + result;
    disc[1] %= disc[0];

    while (disc[1] % disc[0] !== 0) {
      disc[1] += total;
      result += total;
    }

    total *= disc[0];
  }

  return result;
}
