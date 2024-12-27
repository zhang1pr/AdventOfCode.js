const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  let D = [...Array(R)].map(() => Array(C).fill(Infinity));
  let sr, sc;

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (arr[r][c] == 'S')
        sr = r, sc = c;

  let d = BFS();

  function BFS() {
    let q = [[sr, sc]];
    D[sr][sc] = 0;
    let d = 0;

    while (q.length) {
      let nq = [];
      d++;

      for (let [r, c] of q) {
        for (let [dr, dc] of darr) {
          let nr = r + dr, nc = c + dc;
          if (!isIn(nr, nc, R, C) || arr[nr][nc] == '#' || D[nr][nc] != Infinity) continue;

          D[nr][nc] = d;

          if (arr[nr][nc] == 'E')
            return d;

          nq.push([nr, nc]);
        }
      }

      q = nq;
    }
  }

  for (let r1 = 0; r1 < R; r1++)
    for (let c1 = 0; c1 < C; c1++)
      if (arr[r1][c1] != '#')
        for (let r2 = r1 - 2; r2 <= r1 + 2; r2++)
          for (let c2 = c1 - 2; c2 <= c1 + 2; c2++)
            if (
              isIn(r2, c2, R, C)
              && arr[r2][c2] != '#'
              && Math.abs(r2 - r1) + Math.abs(c2 - c1) <= 2
              && Math.abs(D[r1][c1] - D[r2][c2]) - Math.abs(r2 - r1) - Math.abs(c2 - c1) >= 100
            )
              res++;

  return res / 2;
}

console.log(solve(input));