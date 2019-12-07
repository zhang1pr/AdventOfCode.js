function B(input) {
  const object = {
    'U': -4,
    'D': 4,
    'L': -1,
    'R': 1
  };

  const noUpArray = [1, 2, 4, 5, 9];
  const noDownArray = [5, 9, 10, 12, 13];
  const noLeftArray = [1, 2, 5, 10, 13];
  const noRightArray = [1, 4, 9, 12, 13];

  const result = [];
  let key = 5;

  input.split('\n').forEach(line => {
    [...line].forEach(move => {
      if (
        !(move === 'U' && noUpArray.includes(key))
        && !(move === 'D' && noDownArray.includes(key))
        && !(move === 'L' && noLeftArray.includes(key))
        && !(move === 'R' && noRightArray.includes(key))
      ) {
        if (move === 'L' || move === 'R') {
          key += object[move];
        } else if (key === 1 && move === 'D') {
          key = 3;
        } else if (key === 3 && move === 'U') {
          key = 1;
        } else if (key === 11 && move === 'D') {
          key = 13;
        } else if (key === 13 && move === 'U') {
          key = 11;
        } else {
          key += object[move];
        }
      }
    });

    result.push(key);
  });

  return result.reduce((prev, curr) => {
    if (curr > 9) {
      return prev + String.fromCharCode(curr + 55);
    } else {
      return prev + curr.toString();
    }
  }, '');
}
