const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = 0;
  let arr = readword(input);

  for (let row of arr) {
    let [x, vals] = row.split(': ');
    x = +x, vals = vals.split(' ').map(a => +a);

    DFS(x, vals, 0, 0);
  }

  function DFS(x, vals, curi, sum) {
    if (set.has(x)) return;

    if (curi == vals.length) {
      if (x == sum) {
        set.add(x);
        res += x;
      }
      return;
    }

    DFS(x, vals, curi + 1, sum + vals[curi]);
    DFS(x, vals, curi + 1, sum * vals[curi]);
  }

  return res;
}

console.log(solve(input));