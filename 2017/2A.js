function A(input) {
  let count = 0;

  input.split('\n').forEach(line => {
    let min = Infinity;
    let max = 0;

    line.split(/\s+/).map(Number).forEach(number => {
      min = Math.min(min, number);
      max = Math.max(max, number);
    });

    count = count + max - min;
  });

  return count;
}
