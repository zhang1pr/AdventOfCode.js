const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);
  let multi = 1;

  for (let [id, total, t, start] of arr) {
    while ((res + start + id) % total != 0) {
      res += multi;
    }

    multi *= total;
  }

  return res;
}

console.log(solve(input));