const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), set = new Set();
  let arr = readword(input), R = arr.length, C = arr[0].length;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      let x = arr[r][c];
      if (x == '.') continue;

      if (!map.has(x)) map.set(x, []);
      map.get(x).push([r, c]);
    }
  }

  for (let [k, v] of map) {
    for (let i = 0; i < v.length; i++) {
      for (let j = i + 1; j < v.length; j++) {
        let [r1, c1] = v[i], [r2, c2] = v[j];

        let r3 = 2 * r1 - r2, c3 = 2 * c1 - c2;
        let r4 = 2 * r2 - r1, c4 = 2 * c2 - c1;

        if (isIn(r3, c3, R, C))
          set.add(r3 + ',' + c3);

        if (isIn(r4, c4, R, C))
          set.add(r4 + ',' + c4);
      }
    }
  }

  return set.size;
}

console.log(solve(input));