const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0;
  let arr = readword(input).map(a => a.split('-'));

  for (let [a, b] of arr) {
    if (!map.has(a)) {
      map.set(a, []);
    }

    if (!map.has(b)) {
      map.set(b, []);
    }

    map.get(a).push(b);
    map.get(b).push(a);
  }

  let q = [['start', new Set().add('start')]];
  while (q.length) {
    let nq = [];

    for (let [cur, set] of q) {
      if (cur == 'end') {
        res++;
        continue;
      }

      for (let nei of map.get(cur)) {
        if (set.has(nei)) continue;

        let nset = new Set(set);

        if (nei == nei.toLowerCase()) {
          nset.add(nei);
        }

        nq.push([nei, nset]);
      }
    }

    q = nq;
  }

  return res;
}

console.log(solve(input));