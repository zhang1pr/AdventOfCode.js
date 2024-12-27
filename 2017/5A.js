const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/-?\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum(input);

  let i = 0;
  while (i < arr.length) {
    arr[i]++;
    i += arr[i] - 1;
    res++;
  }

  return res;
}

console.log(solve(input));