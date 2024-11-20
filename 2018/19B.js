const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword2d(input);
  let a = +arr[22][2], b = +arr[24][2];
  let num = 836 + 22 * a + b + 10550400;

  let sqrt = Math.floor(Math.sqrt(num));

  for (let d = 1; d <= sqrt; d++)
    if (num % d == 0)
      res += d + num / d;

  if (sqrt ** 2 == num)
    res -= sqrt;

  return res;
}

console.log(solve(input));