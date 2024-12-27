const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let steps = +input;

  let len = 1;
  let idx = 0, res;
  for (let num = 1; num <= 50000000; num++) {
    idx = (idx + steps) % len;
    idx++;
    len++;

    if (idx == 1)
      res = num;
  }

  return res;
}

console.log(solve(input));