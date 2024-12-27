const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  input = +input;
  let x = 0, y = 0;
  let total = 1, t = 1, idx = 0;

  for (let i = 2; i <= input; i++) {
    let [dx, dy] = darr[idx];
    x += dx;
    y += dy;
    t--;

    if (t == 0) {
      idx = (idx + 1) % 4;

      if (idx % 2 == 0) {
        total++;
      }

      t = total;
    }
  }

  return Math.abs(x) + Math.abs(y);
}

console.log(solve(input));