const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');
const dmap = new Map([['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]);
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = '';
  let arr = readword(input), R = arr.length, C = arr[0].length;
  let dstr = '^>v<';

  let r = 0, c = arr[0].indexOf('|'), dir = 'v';

  while (true) {
    let ch = arr[r][c];
    if (ch == ' ') break;
    if (ch == '+') {
      let idx = dstr.indexOf(dir);
      let cand = [idx + 1, idx + 3];

      for (let idx of cand) {
        let ndir = dstr[idx % 4];
        let [dr, dc] = dmap.get(ndir);
        let nr = r + dr, nc = c + dc;

        if (isIn(nr, nc, R, C) && arr[nr][nc] != ' ' && arr[nr][nc] != null) {
          r = nr, c = nc;
          dir = ndir;
          break;
        }
      }
    } else {
      if ('A' <= ch && ch <= 'Z') {
        res += ch;
      }

      let [dr, dc] = dmap.get(dir);
      r += dr, c += dc;
    }
  }

  return res;
}

console.log(solve(input));