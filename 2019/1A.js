function A(input) {
  let count = 0;

  input.split('\n').forEach(number => {
    count = count + Math.floor(parseInt(number, 10)/3) - 2;
  })

  return count;
}
