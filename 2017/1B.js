function B(input) {
  let count = 0;

  for (let i = 0; i < input.length/2; i++) {
    if (input[i] === input[i+input.length/2]) {
      count += parseInt(input[i], 10) * 2;
    }
  }

  return count;
}
