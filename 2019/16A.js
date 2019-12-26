function A(input) {
  const patterns = [1, 0, -1, 0];
  let numbers = input;
  let phase = 100;

  while (phase > 0) {
    phase--;
    let newNumbers1 = '';
    let newNumbers2 = '';

    for (let i = 0; i < numbers.length/2; i++) {
      let index = 0;
      let total = 0;
      let repeat = i + 1;
      let count = 0;

      for (let j = i; j < numbers.length; j++) {
        if (repeat === 0) {
          repeat = i + 1;
          index++;
        }

        if (index === 1 || index === 3) {
          j += i;
          index++;

          if (index === 4) {
            index = 0;
          }
          continue;
        }

        const number = parseInt(numbers[j], 10);
        const pattern = patterns[index];
        repeat--;

        if (number === 0 || pattern === 0) {
          continue;
        }

        let positiveFlag = true;
        let negativeFlag = true;

        if (total < 0 || (total === 0 && count < 0)) {
          positiveFlag = false;
        } else {
          negativeFlag = false;
        }

        total += pattern*number;
        total = total.toString();

        if (total[0] === '-') {
          count -= parseInt(total.slice(1, -1) || 0, 10);
          if (positiveFlag) {
            count -= 1;
          }

          if (count >= 0) {
            total = 10 - parseInt(total[total.length-1], 10);
          } else {
            total = -parseInt(total[total.length-1], 10);
          }
        } else {
          count += parseInt(total.slice(0, -1) || 0, 10);
          if (negativeFlag) {
            count += 1;
          }

          if (count < 0) {
            total = parseInt(total[total.length-1], 10) - 10;
          } else {
            total = parseInt(total[total.length-1], 10);
          }
        }
      }

      const target = total.toString();
      newNumbers1 += target[target.length-1];
    }

    let total = 0;
    for (let i = numbers.length - 1; i >= numbers.length/2; i--) {
      total += parseInt(numbers[i], 10);
      total = total >= 10 ? total % 10 : total;
      newNumbers2 = total.toString() + newNumbers2;
    }

    numbers = newNumbers1 + newNumbers2;
  }

  return numbers.slice(0, 8);
}

