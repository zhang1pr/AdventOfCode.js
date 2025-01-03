const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let steps = +input;

  let arr = [0];
  let idx = 0;

  for (let num = 1; num <= 2017; num++) {
    idx = (idx + steps) % arr.length;

    arr.splice(idx + 1, 0, num);
    idx++;
  }

  return arr[(idx + 1) % arr.length];
}

console.log(solve(input));