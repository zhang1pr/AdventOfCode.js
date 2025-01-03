const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0, total = 2503;
  let arr = readnum2d(input);

  for (let [v, fly, rest] of arr) {
    let times = Math.floor(total / (fly + rest));
    let after = total - times * (fly + rest);
    let val = times * v * fly + Math.min(after, fly) * v;

    res = Math.max(res, val);
  }

  return res;
}

console.log(solve(input));