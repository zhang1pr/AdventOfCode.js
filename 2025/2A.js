const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = input.split(',').map(a => a.split('-').map(a => +a));

  for (let [a, b] of arr) {
    for (let cur = a; cur <= b; cur++) {
      let d = Math.floor(Math.log10(cur)) + 1;

      if (d % 2 == 1) continue;

      d /= 2;
      let a = Math.floor(cur / 10 ** d), b = cur % 10 ** d;

      if (a == b) res += cur;
    }
  }

  return res;
}

console.log(solve(input));