const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0, t = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  let map1 = new Map(), map2 = new Map();

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) {
      if (arr[r][c] != '#') continue;

      let cur1 = new Map(), cur2 = new Map();

      for (let nr = 0; nr < R; nr++)
        for (let nc = 0; nc < C; nc++) {
          if (arr[nr][nc] != '#' || nr == r && nc == c) continue;

          let dr = nr - r, dc = nc - c;

          if (dc == 0) {
            let map = dr < 0 ? cur1 : cur2;

            if (!map.has(-Infinity))
              map.set(-Infinity, []);
            map.get(-Infinity).push([Math.abs(dr), nr, nc]);
          } else {
            let map = dc > 0 ? cur1 : cur2;

            if (!map.has(dr / dc))
              map.set(dr / dc, []);
            map.get(dr / dc).push([Math.abs(dc), nr, nc]);
          }
        }

      let cur = cur1.size + cur2.size;

      if (cur > res) {
        res = cur;
        map1 = cur1;
        map2 = cur2;
      }
    }

  for (let [k, v] of map1)
    v.sort((a, b) => b[0] - a[0]);

  for (let [k, v] of map2)
    v.sort((a, b) => b[0] - a[0]);

  let slope1 = [...map1.keys()].sort((a, b) => a - b);
  let slope2 = [...map2.keys()].sort((a, b) => a - b);

  while (t < 200) {
    for (let slope of slope1) {
      let pos = map1.get(slope).pop();

      if (pos == null) continue;

      t++;
      let [d, r, c] = pos;

      if (t == 200)
        return r + c * 100;
    }

    for (let slope of slope2) {
      let pos = map2.get(slope).pop();

      if (pos == null) continue;

      t++;
      let [d, r, c] = pos;

      if (t == 200)
        return r + c * 100;
    }
  }
}

console.log(solve(input));