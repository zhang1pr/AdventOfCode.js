const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = 0;
  let arr = readnum2d(input);
  let getNei = ([a, b, c]) => [[a + 1, b, c], [a - 1, b, c], [a, b + 1, c], [a, b - 1, c], [a, b, c + 1], [a, b, c - 1]];
  let isIn = (a, b, c) => mina <= a && maxa >= a && minb <= b && maxb >= b && minc <= c && maxc >= c;

  for (let cube of arr)
    set.add(cube.join());

  let mina = Infinity, minb = Infinity, minc = Infinity;
  let maxa = -Infinity, maxb = -Infinity, maxc = -Infinity;

  for (let [a, b, c] of arr) {
    mina = Math.min(mina, a - 1);
    maxa = Math.max(maxa, a + 1);
    minb = Math.min(minb, b - 1);
    maxb = Math.max(maxb, b + 1);
    minc = Math.min(minc, c - 1);
    maxc = Math.max(maxc, c + 1);
  }

  let start = [mina, minb, minc];
  let q = [start];
  let visited = new Set().add(start.join());

  while (q.length) {
    let nq = [];

    for (let cur of q) {
      for (let nei of getNei(cur)) {
        let str = nei.join();

        if (isIn(...nei) && !visited.has(str)) {
          if (set.has(str)) {
            res++;
          } else {
            nq.push(nei);
            visited.add(str);
          }
        }
      }
    }

    q = nq;
  }

  return res;
}