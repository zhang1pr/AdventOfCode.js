function B(input) {
  input = input.split(',').map(i => parseInt(i));

  for (let a=0; a < 100; a++) {
    for (let b=0; b < 100; b++) {
      const inputCopy = input.slice();
      inputCopy[1] = a;
      inputCopy[2] = b;

      for (let i = 0; i < inputCopy.length; i = i+4) {
        if (inputCopy[i] === 99) {
          if (inputCopy[0] === 19690720) {
            return a*100 + b;
          } else {
            break;
          }
        }

        if (inputCopy[i] === 1) {
          inputCopy[inputCopy[i+3]] = inputCopy[inputCopy[i+1]] + inputCopy[inputCopy[i+2]];
        } else if (inputCopy[i] === 2) {
          inputCopy[inputCopy[i+3]] = inputCopy[inputCopy[i+1]] * inputCopy[inputCopy[i+2]];
        }
      }
    }
  }
}
