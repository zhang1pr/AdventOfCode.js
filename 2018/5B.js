function B(input) {
  input = reactPolymer(input);

  const set = new Set();

  for (let i = 0; i < input.length; i++) {
    const letter = input[i].toLowerCase();
    set.add(letter);
  }

  let min = input.length;
  [...set].forEach(letter => {
    min = Math.min(min, findShortestPolymer(input, letter));
  })

  return min;
}

function findShortestPolymer(input, letter) {
  const re = new RegExp(letter, 'gi');
  input = input.replace(re,'');

  return reactPolymer(input).length;
}

function reactPolymer(input) {
  let flag = true;
  let inputCopy = '';

  while (flag) {
    flag = false;

    for (let i = 0; i < input.length; i++) {
      if (i === input.length - 1) {
        inputCopy += input[i];
      } else if (Math.abs(input[i].charCodeAt(0) - input[i+1].charCodeAt(0)) === 32) {
        flag = true;
        i++;
      } else {
        inputCopy += input[i];
      }
    }

    input = inputCopy;
    inputCopy = '';
  }

  return input.length;
}
