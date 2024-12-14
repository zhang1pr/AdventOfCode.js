const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (!set.has(r + ',' + c))
        res += BFS(r, c, arr[r][c]);

  function BFS(r, c, ch) {
    let q = [[r, c]];
    let cnt = 0, p = 0;
    set.add(r + ',' + c);

    while (q.length) {
      let nq = [];

      for (let [r, c] of q) {
        cnt++;

        for (let [dr, dc] of darr) {
          let nr = r + dr, nc = c + dc;

          if (!isIn(nr, nc, R, C) || arr[nr][nc] != ch) {
            p++;
            continue;
          }

          if (set.has(nr + ',' + nc)) continue;
          set.add(nr + ',' + nc);

          nq.push([nr, nc]);
        }
      }

      q = nq;
    }

    return cnt * p;
  }

  return res;
}

console.log(solve(input));