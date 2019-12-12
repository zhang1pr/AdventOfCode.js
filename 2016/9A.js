function A(input) {
  let length = input.length;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      const index = input.indexOf(')', i) + 1;
      const marker = input.slice(i, index);
      const parts = marker.split('x');
      const number1 = parseInt(parts[0].slice(1), 10);
      const number2 = parseInt(parts[1].slice(0, -1), 10);

      length += (number2 - 1) * number1;
      length -= marker.length;

      i = index - 1 + number1;
    }
  }

  return length;
}
