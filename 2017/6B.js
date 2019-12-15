function A(input) {
  const numbers = input.split(/\s+/).map(Number);
  const set = new Set();
  let step = 0;
  let target;

  while (true) {
    const max = Math.max(...numbers);
    const index = numbers.indexOf(max);
    numbers[index] = 0;
    const quotient = Math.floor(max/numbers.length);
    let remainder = max%numbers.length;

    for (let i = 0; i < numbers.length; i++) {
      const j = i + index + 1 < numbers.length ? i + index + 1 : i + index + 1 - numbers.length;
      numbers[j] += quotient;
      if (remainder > 0) {
        remainder--;
        numbers[j] += 1;
      }
    }

    const string = numbers.join(',');
    if (!target) {
      if (!set.has(string)) {
        set.add(string);
      } else {
        target = string;
      }
    } else {
      step++;
      if (target === string) {
        break;
      }
    }
  }

  return step;
}
