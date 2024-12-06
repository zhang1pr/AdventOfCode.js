const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const dstr = '^>v<';
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input).map(a => a.split('')), R = arr.length, C = arr[0].length;
  let cr, cc;

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (arr[r][c] == '^')
        cr = r, cc = c;

  function calc(cr, cc) {
    let set = new Set();
    let d = '^';
    set.add(cr + ',' + cc + ',' + d);

    while (true) {
      let [dr, dc] = darr[dstr.indexOf(d)];
      let nr = cr + dr, nc = cc + dc;

      if (!isIn(nr, nc, R, C)) break;

      if (arr[nr][nc] == '#') {
        let idx = (dstr.indexOf(d) + 1) % 4;
        d = dstr[idx];
      } else {
        cr = nr;
        cc = nc;
      }

      if (set.has(cr + ',' + cc + ',' + d)) {
        res++;
        break;
      }

      set.add(cr + ',' + cc + ',' + d);
    }
  }

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (arr[r][c] == '.') {
        arr[r][c] = '#';
        calc(cr, cc);
        arr[r][c] = '.';
      }

  return res;
}

console.log(solve(input));