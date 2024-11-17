const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), set = new Set(), res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;
  let num = '';
  let isDigit = x => x >= '0' && x <= '9';

  for (let i = 0; i <= arr.length; i++) {
    if (num != '') map.set((i - 1) + ',' + (C - 1), +num);
    if (i == arr.length) break;

    let right;

    for (let j = 0; j < arr.length; j++) {
      if (isDigit(arr[i][j])) {
        num += arr[i][j];
        right = j;
      } else if (num) {
        map.set(i + ',' + right, +num);
        num = '';
        right = null;
      }
    }
  }

  for (let r = 0; r < arr.length; r++) {
    for (let c = 0; c < arr.length; c++) {
      if (isDigit(arr[r][c]) || arr[r][c] == '.') continue;

      for (let [dr, dc] of ddarr) {
        let nr = r + dr, nc = c + dc;

        if (isIn(nr, nc, R, C) && isDigit(arr[nr][nc])) {
          while (isIn(nr, nc + 1, R, C) && isDigit(arr[nr][nc + 1]))
            nc++;

          let str = nr + ',' + nc;
          if (!set.has(str)) {
            res += map.get(str);
            set.add(str);
          }
        }
      }
    }
  }

  return res;
}