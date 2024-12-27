const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map([...'SabcdefghijklmnopqrstuvwxyzE'].map((ch, idx) => [ch, idx]));
  let set = new Set(), t = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;
  let q = [];

  for (let i = 0; i < R; i++)
    for (let j = 0; j < C; j++)
      if (arr[i][j] == 'S') {
        q.push([i, j]);
        set.add(i + ',' + j);
      }

  while (q.length) {
    t++;
    let nq = [];

    for (let [r, c] of q) {
      for (let [dr, dc] of darr) {
        let nr = r + dr, nc = c + dc;

        if (isIn(nr, nc, R, C)) {
          let cur = arr[r][c], nei = arr[nr][nc];

          if (!set.has(nr + ',' + nc) && map.get(nei) - map.get(cur) <= 1) {
            if (nei == 'E')
              return t;

            set.add(nr + ',' + nc);
            nq.push([nr, nc]);
          }
        }
      }
    }

    q = nq;
  }
}

console.log(solve(input));