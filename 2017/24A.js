const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), set = new Set(), res = 0;
  let arr = readnum2d(input);

  for (let [a, b] of arr) {
    if (!map.has(a)) map.set(a, []);
    if (!map.has(b)) map.set(b, []);

    map.get(a).push([a, b]);
    if (a != b) map.get(b).push([a, b]);
  }

  function DFS(node, sum) {
    for (let [a, b] of (map.get(node) || [])) {
      let key = a + ',' + b;

      if (!set.has(key)) {
        set.add(key);
        let nsum = sum + a + b;

        res = Math.max(res, nsum);
        DFS(node ^ a ^ b, nsum);
        set.delete(key);
      }
    }
  }

  DFS(0, 0);

  return res;
}

console.log(solve(input));