const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), t = 0;
  let arr = readword(input).slice(0, 1024);

  let goal = 70;
  let r = 0, c = 0, er = goal, ec = goal;

  for (let x of arr)
    set.add(x);

  let q = [[r, c]];

  while (q.length) {
    let nq = [];
    t++;

    for (let [r, c] of q) {
      for (let [dr, dc] of darr) {
        let nr = r + dr, nc = c + dc;
        if (!isIn(nr, nc, goal + 1, goal + 1) || set.has(nr + ',' + nc)) continue;

        set.add(nr + ',' + nc);

        if (nr == goal && nc == goal)
          return t;

        nq.push([nr, nc]);
      }
    }

    q = nq;
  }

  return t;
}

console.log(solve(input));