function A(input) {
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    if (i === input.length - 1 && input[0] === input[i]) {
      count += parseInt(input[i], 10);
    }

    if (input[i] === input[i+1]) {
      count += parseInt(input[i], 10);
    }
  }

  return count;
}
