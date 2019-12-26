function B(input) {
  const offset = parseInt(input.slice(0, 7), 10);
  const times = 10000;
  let numbers = input.repeat(times).slice(offset);

  if (offset >= input.length * times/2) {
    let phase = 100;

    while (phase > 0) {
      phase--;
      let newNumbers = '';

      let total = 0;
      for (let i = numbers.length - 1; i >= 0; i--) {
        total += parseInt(numbers[i], 10);
        total = total >= 10 ? total % 10 : total;
        newNumbers = total.toString() + newNumbers;
      }

      numbers = newNumbers;
    }
  }

  return numbers.slice(0, 8);
}
