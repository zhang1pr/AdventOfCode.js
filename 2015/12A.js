function A(input) {
  let positiveString = '';
  let negativeString = '';

  let count = 0;
  let flag = true;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '-') {
      flag = false;
    } else if (!Number.isNaN(parseInt(input[i], 10))) {
      if (flag) {
        positiveString += input[i];
      } else {
        negativeString += input[i];
      }
    } else {
      if (positiveString !== '') {
        count += parseInt(positiveString, 10);
        positiveString = '';
      }

      if (negativeString !== '') {
        count -= parseInt(negativeString, 10);
        negativeString = '';
        flag = true;
      }

      if (input[i] === '[' && input[i+1] === ']') {
        count += 1;
      }

      if (input[i] === '{' && input[i+1] === '}') {
        count += 1;
      }
    }
  }

  return count;
}
