function A(input) {
  const object = {
    'U': -3,
    'D': 3,
    'L': -1,
    'R': 1
  };

  let result = '';
  let number = 5;

  input.split('\n').forEach(line => {
    [...line].forEach(move => {
      if (
        !(move === 'L' && [1,4,7].includes(number))
        && !(move === 'R' && [3,6,9].includes(number))
      ) {
        const next = number + object[move];

        if (next>=1 && next<=9) {
          number = next;
        }
      }
    });

    result += number.toString();
  });

  return parseInt(result, 10);
}
