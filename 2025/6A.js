const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword2d(input).map(a => a.filter(Boolean)), R = arr.length, C = arr[0].length;

  for (let i = 0; i < C; i++) {
    let num = +arr[0][i], sign = arr[R - 1][i];
    for (let j = 1; j < R - 1; j++)
      num = sign == '+' ? num + +arr[j][i] : num * +arr[j][i];

    res += num;
  }

  return res;
}

console.log(solve(input));