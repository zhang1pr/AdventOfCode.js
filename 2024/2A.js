const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);

  for (let row of arr) {
    let sorted = row.toSorted((a, b) => a - b);
    let sorted2 = row.toSorted((a, b) => b - a);

    if (
      !sorted.every((x, i) => x == row[i])
      && !sorted2.every((x, i) => x == row[i])
    ) continue;

    let d = [];
    for (let i = 0; i < row.length - 1; i++)
      d.push(row[i + 1] - row[i]);

    if (d.every(a => Math.abs(a) >= 1 && Math.abs(a) <= 3)) {
      res++;
    }
  }

  return res;
}

console.log(solve(input));