const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = -Infinity;
  let arr = readword(input)[0].split(':')[1].split(',').map(a => a.split('..')).map(a => [a[0].split('=')[1], a[1]].map(a=>Number(a)));

  let [[xlo, xhi], [ylo, yhi]] = arr;

  for (let x = -xhi; x <= xhi; x++) {
    for (let y = -xhi; y <= xhi; y++) {
      let sx = x, sy = y;
      let curx = 0, cury = 0;
      let r = cury;

      while (curx <= xhi && cury >= ylo) {
        curx += sx;
        cury += sy;

        r = Math.max(r, cury);
        if (sx < 0) sx++;
        if (sx > 0) sx--;
        sy--;

        if (curx <= xhi && curx >= xlo && cury >= ylo && cury <= yhi) {
          res = Math.max(r, res);
        }
      }
    }
  }

  return res;
}