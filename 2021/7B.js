const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = Infinity;
  let arr = readword(input);
  arr = arr.map(a => a.split(','))[0].map(a => +a);

  for (let j = 0; j < arr.length; j++) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      let cur = Math.abs(arr[i] - j);

      sum += (cur + 1) * cur / 2;
    }

    res = Math.min(res, sum);
  }

  return res;
}