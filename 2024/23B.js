const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res;
  let arr = readword(input);

  for (let line of arr) {
    let [u, v] = line.split('-');

    if (!map.has(u)) map.set(u, new Set());
    map.get(u).add(v);

    if (!map.has(v)) map.set(v, new Set());
    map.get(v).add(u);
  }

  let visited = new Set(), max = 0;

  for (let u of map.keys())
    DFS(u, new Set());

  function DFS(cur, curSet) {
    let str = [cur, ...curSet].sort().join(',');

    if (visited.has(str))
      return;

    visited.add(str);

    for (let good of curSet)
      if (good != cur && !map.get(cur).has(good))
        return;

    if (curSet.has(cur)) {
      if (curSet.size > max) {
        max = curSet.size;
        res = [...curSet].sort().join(',');
      }

      return;
    }

    curSet.add(cur);

    for (let nei of map.get(cur))
      DFS(nei, curSet);

    curSet.delete(cur);
  }

  return res;
}

console.log(solve(input));