const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);

  function check(a, b, c) {
    return a + b > c;
  }

  for (let i = 1; i <= 3; i++) {
    for (let j = 0; j < arr.length; j += 3) {
      let a = arr[j][i], b = arr[j + 1][i], c = arr[j + 2][i];

      if (check(a, b, c) && check(a, c, b) && check(b, c, a))
        res++;
    }
  }

  return res;
}

console.log(solve(input));