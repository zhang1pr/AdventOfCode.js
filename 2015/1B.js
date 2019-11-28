function B(input) {
  let count = 0;

  for (const [index, level] of input.split('').entries()) {
    if (level === '(') {
      count += 1;
    } else {
      count -= 1;
    }

    if (count === -1) {
      return index + 1;
    }
  }
}
