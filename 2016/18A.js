function A(input) {
  let level = 1;
  let count = input.match(/\./g).length;

  while (level < 40) {
    level++;

    let newInput = '';
    for (let i = 0; i < input.length; i++) {
      if (
        input[i-1] !== '^' && input[i+1] === '^'
        || input[i-1] === '^' && input[i+1] !== '^'
      ) {
        newInput += '^';
      } else {
        newInput += '.';
        count++;
      }
    }

    input = newInput;
  }

  return count;
}
