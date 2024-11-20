const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), indMap = new Map(), set = new Set(), res = '';
  let arr = readword2d(input);

  for (let ins of arr) {
    let [u, v] = [ins[1], ins[7]];
    set.add(u).add(v);

    if (!map.has(u)) map.set(u, []);
    map.get(u).push(v);

    indMap.set(v, (indMap.get(v) || 0) + 1);
  }

  let q = [];
  for (let x of set)
    if (!indMap.has(x))
      q.push(x);

  while (q.length) {
    q.sort();
    let cur = q.shift();
    res += cur;

    for (let nei of (map.get(cur) || [])) {
      let ind = indMap.get(nei) - 1;
      if (ind == 0) q.push(nei);
      indMap.set(nei, ind);
    }
  }

  return res;
}

console.log(solve(input));