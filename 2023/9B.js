const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/-?\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);

  for (let seq of arr) {
    seq.reverse();
    let all = [seq];
    let cur;
    let last = seq;

    while (!last.every(a => a == 0)) {
      cur = [];

      for (let i = 0; i < last.length - 1; i++)
        cur.push(last[i + 1] - last[i]);

      all.push(cur);

      last = cur;
    }

    for (let i = all.length - 2; i >= 0; i--)
      res += all[i].at(-1);
  }

  return res;
}

console.log(solve(input));