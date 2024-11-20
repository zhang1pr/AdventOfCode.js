const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0, x = 1;
  let arr = readword2d(input);
  let idx = [20, 60, 100, 140, 180, 220];
  let pre = [1];

  for (let [ins, val] of arr) {
    if (ins == 'addx') {
      pre.push(x);
      val = +val;
      x += val;
    }

    pre.push(x);
  }

  for (let i of idx) {
    res += pre[i - 1] * i;
  }

  return res;
}

console.log(solve(input));