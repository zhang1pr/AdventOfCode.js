function A(input) {
  let flag = true;
  let inputCopy = '';

  while (flag) {
    flag = false;

    for (let i = 0; i < input.length; i++) {
      if (i === input.length - 1) {
        inputCopy += input[i];
      } else if (Math.abs(input[i].charCodeAt(0) - input[i+1].charCodeAt(0)) === 32) {
        flag = true;
        i++;
      } else {
        inputCopy += input[i];
      }
    }

    input = inputCopy;
    inputCopy = '';
  }

  return input.length;
}
