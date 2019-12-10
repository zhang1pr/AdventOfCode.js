function A(input) {
  return input.split('\n').reduce((prev, curr) => {
    return prev + parseInt(curr, 10);
  }, 0);
}
