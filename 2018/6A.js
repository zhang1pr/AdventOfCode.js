const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map();
  let arr = readnum2d(input);
  let minx = miny = Infinity, maxx = maxy = 0;

  for (let [x, y] of arr) {
    minx = Math.min(minx, x);
    maxx = Math.max(maxx, x);
    miny = Math.min(miny, y);
    maxy = Math.max(maxy, y);
  }

  for (let x=minx; x<=maxx; x++) {
    for (let y=miny; y<=maxy; y++) {
      let min = Infinity, pid, f = true;

      for (let i=0; i<arr.length; i++) {
        let [px, py] = arr[i];
        let d = Math.abs(x - px) + Math.abs(y - py);

        if (d < min) {
          min = d ;
          pid = i;
          f = true;
        } else if (d == min) {
          f = false;
        }
      }

      if (f) map.set(pid, (map.get(pid) || 0) + 1);
    }
  }

  return Math.max(...map.values());
}
