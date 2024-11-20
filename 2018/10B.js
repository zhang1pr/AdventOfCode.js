const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readnum2d(input);
  let t = 0;

  while (true) {
    let set = new Set();
    t++;

    for (let i = 0; i < arr.length; i++) {
      let [x, y, dx, dy] = arr[i];

      arr[i][0] += dx;
      arr[i][1] += dy;
      set.add(arr[i][0] + ',' + arr[i][1]);
    }

    let good = true;
    for (let i = 0; i < arr.length; i++) {
      let [x, y] = arr[i];

      let f = false;
      for (let [dx, dy] of ddarr) {
        let nx = x + dx, ny = y + dy;

        if (set.has(nx + ',' + ny))
          f = true;
      }

      if (!f) {
        good = false;
        break;
      }
    }

    if (good)
      break;
  }

  return t;
}

console.log(solve(input));