const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let H = 6, W = 25;
  let max = Infinity;

  for (let i = 0; i < input.length; i += W * H) {
    let zero = 0, one = 0, two = 0;

    for (let ch of input.slice(i, i + W * H))
      if (ch == '0') zero++;
      else if (ch == '1') one++;
      else if (ch == '2') two++;

    if (zero < max) {
      max = zero;
      res = one * two;
    }
  }

  return res;
}

console.log(solve(input));