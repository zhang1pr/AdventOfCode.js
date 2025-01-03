const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let cnt = 0;
  let arr = input;

  for (let i = 0; i < arr.length; i++) {
    cnt += arr[i] == '(' ? 1 : -1;

    if (cnt < 0) return i + 1;
  }
}

console.log(solve(input));