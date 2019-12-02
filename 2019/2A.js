function A(input) {
  input = input.split(',').map(i => parseInt(i));

  for (let i = 0; i < input.length; i = i + 4) {
    if (input[i] === 99) {
      return input[0];
    }

    if (input[i] === 1) {
      input[input[i+3]] = input[input[i+1]] + input[input[i+2]];
    } else if (input[i] === 2) {
      input[input[i+3]] = input[input[i+1]] * input[input[i+2]];
    }
  }
}
