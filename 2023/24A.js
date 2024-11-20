const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input).map(readnum);
  let lo = 200000000000000, hi = 400000000000000;

  for (let i = 0; i < arr.length; i++) {
    let [x1, y1, z1, vx1, vy1, vz1] = arr[i];
    let slope1 = vy1 / vx1;
    let intercept1 = y1 - slope1 * x1;

    for (let j = i + 1; j < arr.length; j++) {
      let [x2, y2, z2, vx2, vy2, vz2] = arr[j];

      let slope2 = vy2 / vx2;
      let intercept2 = y2 - slope2 * x2;

      if (slope1 == slope2)
        continue;

      let ix = (intercept2 - intercept1) / (slope1 - slope2);
      let iy = slope1 * ix + intercept1;

      let d1 = (ix - x1) / vx1;
      let d2 = (ix - x2) / vx2;

      if (d1 < 0 || d2 < 0)
        continue;

      if (lo <= ix && ix <= hi && lo <= iy && iy <= hi)
        res++;
    }
  }

  return res;
}

console.log(solve(input));