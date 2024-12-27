const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);

  for (let row of arr) {
    for (let i = 0; i < row.length; i++) {
      let nrow = [...row.slice(0, i), ...row.slice(i + 1)];

      let sorted = nrow.toSorted((a, b) => a - b);
      let sorted2 = nrow.toSorted((a, b) => b - a);

      if (
        !sorted.every((x, i) => x == nrow[i])
        && !sorted2.every((x, i) => x == nrow[i])
      ) continue;

      let d = [];
      for (let j = 0; j < nrow.length - 1; j++)
        d.push(nrow[j + 1] - nrow[j]);

      if (d.every(a => Math.abs(a) >= 1 && Math.abs(a) <= 3)) {
        res++;
        break;
      }
    }
  }

  return res;
}

console.log(solve(input));