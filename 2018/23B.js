const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readnum2d(input);
  let max = Array(3).fill(-Infinity), min = Array(3).fill(Infinity);

  let getD = arr => arr.reduce((a, b) => a + Math.abs(b), 0);

  for (let bot of arr)
    for (let i = 0; i < 3; i++)
      if (max[i] < bot[i])
        max[i] = bot[i];
      else if (min[i] > bot[i])
        min[i] = bot[i];

  let size = max[0] - min[0];

  let res;
  while (size > 0) {
    let maxCount = 0;

    for (let x = min[0]; x <= max[0]; x += size) {
      for (let y = min[1]; y <= max[1]; y += size) {
        for (let z = min[2]; z <= max[2]; z += size) {
          let count = 0;

          for (const [xx, yy, zz, r] of arr) {
            let dist = Math.abs(x - xx) + Math.abs(y - yy) + Math.abs(z - zz);
            if (dist - r < size)
              count++;
          }

          if (maxCount < count) {
            maxCount = count;
            res = [x, y, z];
          } else if (maxCount == count && (!res || getD([x, y, z]) < getD(res))) {
            res = [x, y, z];
          }
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      min[i] = res[i] - size;
      max[i] = res[i] + size;
    }

    size = Math.floor(size / 2);
  }

  return getD(res);
}