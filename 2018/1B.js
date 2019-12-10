function B(input) {
  const array = input.split('\n').map(Number);
  const set = new Set();
  let frequency = 0;

  while (true) {
    for (const number of array) {
      frequency += number;

      if (set.has(frequency)) {
        return frequency;
      } else {
        set.add(frequency);
      }
    }
  }
}
