function B(input) {
  let count = 0;

  const number1 = parseInt(input.split('-')[0], 10);
  const number2 = parseInt(input.split('-')[1], 10);

  for (let i = number1; i < number2+1; i++) {
    const number = i.toString();
    let flag = false;
    let matchingCount = 0;

    for (let j = 0; j < number.length-1; j++) {
      if (number[j] > number[j+1]) {
        break;
      }

      if (number[j] === number[j+1]) {
        if (number[j+1] === number[j+2]) {
          continue;
        } else if (number[j] !== number[j-1]) {
          flag = true;
        }
      }

      if (j === number.length - 2 && flag) {
        count += 1;
      }
    }
  }

  return count;
}
