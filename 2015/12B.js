function B(input) {
  let positiveString = '';
  let negativeString = '';

  let count = 0;
  let countArray = [];

  let redBraceCount = 0;
  let numberFlag = true;
  let redFlag = false;

  for (let i = 0; i < input.length; i++) {
    if (redFlag) {
      if (input[i] === '{') {
        redBraceCount += 1;
      } else if (input[i] === '}') {
        if (redBraceCount === 0) {
          redFlag = false;
          count = countArray.pop();
        } else {
          redBraceCount -= 1;
        }
      }

      continue;
    }

    if (input.slice(i-2, i+4) === ':\"red\"') {
      redFlag = true;
      count = 0;

      continue;
    }

    if (input[i] === '{') {
      countArray.push(count);
      count = 0;
    } else if (input[i] === '}') {
      count = count + countArray.pop();
    }

    if (input[i] === '-') {
      numberFlag = false;
    } else if (!Number.isNaN(parseInt(input[i], 10))) {
      if (numberFlag) {
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
        numberFlag = true;
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
