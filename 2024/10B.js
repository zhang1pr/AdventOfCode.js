const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const cp = (state) => JSON.parse(JSON.stringify(state));
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), set = new Set(), res = 0, tmp = 0, t = 0;
  let arr = readword(input).map(a => a.split('').map(a => +a)), R = arr.length, C = arr[0].length;
  let dp = cp(arr).map(a => a.fill(0));
  let q = [];

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (arr[r][c] == 0) {
        q.push([r, c]);
        dp[r][c] = 1;
      }

  let vis = new Set();
  for (let [r, c] of q)
    vis.add([r, c].join(','));

  while (q.length) {
    let nq = [];

    for (let [r, c] of q) {
      for (let [dr, dc] of darr) {
        let nr = r + dr, nc = c + dc;

        if (isIn(nr, nc, R, C) && arr[nr][nc] == arr[r][c] + 1) {
          dp[nr][nc] += dp[r][c];

          if (vis.has([nr, nc].join(','))) continue;
          vis.add([nr, nc].join(','));

          q.push([nr, nc]);
        }
      }
    }

    q = nq;
  }

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (arr[r][c] == 9)
        res += dp[r][c];

  return res;
}

console.log(solve(input));