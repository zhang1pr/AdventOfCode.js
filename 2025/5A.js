const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let [fir, sec] = input.split('\n\n').map(readword);
  let arr = [];

  for (let row of fir) {
    let [a, b] = row.split('-');
    arr.push([+a, +b]);
  }

  arr.sort((a, b) => a[0] - b[0]);

  sec = sec.map(a => +a).sort((a, b) => a - b);

  let i = 0, j = 0;
  while (i < sec.length && j < arr.length) {
    if (sec[i] < arr[j][0]) i++;
    else if (sec[i] > arr[j][1]) j++;
    else res++, i++;
  }

  return res;
}

console.log(solve(input));