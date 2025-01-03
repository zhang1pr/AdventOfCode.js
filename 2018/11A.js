const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res, max = -Infinity;
  let serial = readnum(input)[0];
  let arr = [...Array(301)].map(() => Array(301));

  for (let i = 1; i <= 300; i++) {
    for (let j = 1; j <= 300; j++) {
      let rack = i + 10;
      let power = rack * j;
      power += serial;
      power *= rack;
      power = Math.trunc(power / 100);
      power %= 10;
      power -= 5;
      arr[i][j] = power;
    }
  }

  for (let i = 1; i <= 298; i++) {
    for (let j = 1; j <= 298; j++) {
      let sum = 0;

      for (let r = 0; r <= 2; r++)
        for (let c = 0; c <= 2; c++)
          sum += arr[i + r][j + c];

      if (sum > max) {
        max = sum;
        res = i + ',' + j;
      }
    }
  }

  return res;
}

console.log(solve(input));