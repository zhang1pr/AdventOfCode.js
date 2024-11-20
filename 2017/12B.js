const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), set = new Set(), res = 0;
  let arr = readword(input);

  for (let str of arr) {
    let [from, to] = str.split(' <-> ');
    map.set(from, to.split(', '));
  }

  for (let [cur, v] of map) {
    if (!set.has(cur)) {
      res++;
      let q = [cur];
      while (q.length) {
        let nq = [];

        for (let cur of q) {
          for (let nei of (map.get(cur) || [])) {
            if (!set.has(nei)) {
              set.add(nei);
              nq.push(nei);
            }
          }
        }


        q = nq;
      }
    }
  }

  return res;
}

console.log(solve(input));