const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) {
      if (arr[r][c] != '#') continue;

      let set1 = new Set(), set2 = new Set();

      for (let nr = 0; nr < R; nr++)
        for (let nc = 0; nc < C; nc++) {
          if (arr[nr][nc] != '#' || nr == r && nc == c) continue;

          let dr = nr - r, dc = nc - c;

          if (dc == 0)
            (dr < 0 ? set1 : set2).add(-Infinity);
          else
            (dc > 0 ? set1 : set2).add(dr / dc);
        }

      res = Math.max(res, set1.size + set2.size);
    }

  return res;
}

console.log(solve(input));