function A(input) {
  const array = input.split('\n').map(Number);
  let step = 0;

  for (let i = 0; i < array.length;) {
    step += 1;
    array[i] += 1;
    i += array[i] - 1;
  }

  return step;
}
