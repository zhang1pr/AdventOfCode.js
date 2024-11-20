const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]);
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0, t = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  let q = [[1, 0, new Set().add(1 + ',' + 0)]];

  while (q.length) {
    let nq = [];

    for (let [r, c, set] of q) {
      if (r == R - 1, c == C - 2) res = Math.max(t, res);

      if ('^v<>'.includes(arr[r][c])) {
        let [dr, dc] = dmap.get(arr[r][c]);
        r += dr, c += dc;
        let str = r + ',' + c;

        if (isIn(r, c, R, C) && arr[r][c] != '#' && !set.has(str)) {
          set.add(str);
          nq.push([r, c, set]);
        }
      } else {
        for (let [dr, dc] of darr) {
          let nr = r + dr, nc = c + dc;
          let str = nr + ',' + nc;

          if (isIn(nr, nc, R, C) && arr[nr][nc] != '#' && !set.has(str)) {
            let nset = new Set(set);
            nset.add(str);
            nq.push([nr, nc, nset]);
          }
        }
      }
    }

    t++;
    q = nq;
  }

  return res;
}

console.log(solve(input));