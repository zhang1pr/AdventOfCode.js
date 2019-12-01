function B(input) {
  let count = 0;

  input.split('\n').forEach(number => {
    while (true) {
      const fuel = Math.floor(parseInt(number, 10)/3) - 2;
      if (fuel > 0) {
        count += fuel;
        number = fuel;
      } else {
        break;
      }
    }
  })

  return count;
}
