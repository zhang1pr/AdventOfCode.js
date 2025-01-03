const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 20151125, multi = 252533, MOD = 33554393;
  let [R, C] = readnum(input);
  let order = R + C - 1;
  let sum = order * (order + 1) / 2 - (order - C) - 1;

  for (let i = 0; i < sum; i++) {
    res = (res * multi) % MOD;
  }

  return res;
}

console.log(solve(input));