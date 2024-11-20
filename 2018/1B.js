const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set().add(0), res = 0;
  let arr = readnum(input);

  while (true)
    for (let x of arr) {
      res += x;
      if (set.has(res)) return res;
      else set.add(res);
    }
}

console.log(solve(input));