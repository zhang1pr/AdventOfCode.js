const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let [fir] = input.split('\n\n').map(readword);
  let arr = [];

  for (let row of fir) {
    let [a, b] = row.split('-');
    arr.push([+a, +b]);
  }

  arr.sort((a, b) => a[0] - b[0]);

  let i = 0;
  while (i < arr.length) {
    let j = i, cur = arr[i][1];
    while (j < arr.length && arr[j][0] <= cur) cur = Math.max(cur, arr[j][1]), j++;
    j--;

    res += cur - arr[i][0] + 1;
    i = j + 1;
  }

  return res;
}

console.log(solve(input));