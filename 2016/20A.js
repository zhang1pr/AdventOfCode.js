const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readnum2d(input).sort((a, b) => a[0] - b[0]);

  let last = 0;

  for (let [start, end] of arr) {
    if (last + 1 >= start) {
      last = Math.max(last, end);
    } else {
      return last + 1;
    }
  }
}

console.log(solve(input));