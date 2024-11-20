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
    row.sort((a, b) => b - a);
    for (let i = 0; i < row.length; i++)
      for (let j = i + 1; j < row.length; j++)
        if (row[i] % row[j] == 0)
          res += row[i] / row[j];
  }

  return res;
}

console.log(solve(input));