const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), set = new Set(), res = 0;
  let arr = readword(input);

  for (let row of arr) {
    let [u, v] = row.split(')');

    if (!map.has(u)) map.set(u, []);
    map.get(u).push(v);

    if (!map.has(v)) map.set(v, []);
    map.get(v).push(u);
  }

  let q = ['YOU'];
  let d = -1;
  while (q.length) {
    let nq = [];
    d++;

    for (let cur of q) {
      for (let nei of map.get(cur)) {
        if (set.has(nei)) continue;
        set.add(nei);

        if (nei === 'SAN') return d - 1;

        nq.push(nei);
      }
    }

    q = nq;
  }

  return res;
}

console.log(solve(input));