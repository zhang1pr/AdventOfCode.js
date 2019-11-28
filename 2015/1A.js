function A(input) {
  let count = 0;

  input.split('').forEach(level => {
    if (level === '(') {
      count += 1;
    } else {
      count -= 1;
    }
  })

  return count;
}
