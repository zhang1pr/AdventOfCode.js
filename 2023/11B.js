const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let rset = new Set(), cset = new Set(), res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;
  let pos = [];

  for (let i = 0; i < R; i++) {
    let f = true;
    for (let j = 0; j < C; j++)
      if (arr[i][j] == '#')
        f = false, pos.push([i, j]);

    if (f) rset.add(i);
  }

  for (let i = 0; i < C; i++) {
    let f = true;
    for (let j = 0; j < R; j++)
      if (arr[j][i] == '#')
        f = false;

    if (f) cset.add(i);
  }

  for (let i = 0; i < pos.length; i++) {
    let [r1, c1] = pos[i];

    for (let j = i + 1; j < pos.length; j++) {
      let [r2, c2] = pos[j];

      res += Math.abs(r1 - r2) + Math.abs(c1 - c2);

      for (let r of rset)
        if (Math.min(r1, r2) <= r && r <= Math.max(r1, r2))
          res += 10 ** 6 - 1;

      for (let c of cset)
        if (Math.min(c1, c2) <= c && c <= Math.max(c1, c2))
          res += 10 ** 6 - 1;
    }
  }

  return res;
}