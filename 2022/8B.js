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

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      let score = 1;

      for (let [dr, dc] of darr) {
        let cnt = 0;
        let nr = r + dr, nc = c + dc;

        while (isIn(nr, nc, R, C) && arr[nr][nc] < arr[r][c]) {
          nr += dr, nc += dc;
          cnt++;
        }

        if (isIn(nr, nc, R, C)) {
          cnt++;
        }

        score *= cnt;
      }

      res = Math.max(res, score);
    }
  }

  return res;
}

console.log(solve(input));