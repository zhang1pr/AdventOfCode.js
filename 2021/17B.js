const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0;
  let arr = input.split(':')[1].split(',').map(a => a.split('..')).map(a => [a[0].split('=')[1], a[1]].map(a => Number(a)));

  let [[xlo, xhi], [ylo, yhi]] = arr;

  for (let x = -xhi; x <= xhi; x++) {
    for (let y = -xhi; y <= xhi; y++) {
      let sx = x, sy = y;
      let curx = 0, cury = 0;

      while (curx <= xhi && cury >= ylo) {
        curx += sx;
        cury += sy;

        if (sx < 0) sx++;
        if (sx > 0) sx--;
        sy--;

        if (curx <= xhi && curx >= xlo && cury >= ylo && cury <= yhi) {
          res++;
          break;
        }
      }
    }
  }

  return res;
}