function B(input) {
  const array = input.split('\n').map(Number);
  let step = 0;

  for (let i = 0; i < array.length;) {
    step += 1;
    const temp = array[i];
    if (temp >= 3) {
      array[i] -= 1;
    } else {
      array[i] += 1;
    }

    i += temp;
  }

  return step;
}
