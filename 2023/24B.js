let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim();
let darr = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
let readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
let readnum2d = (a) => a.split('\n').map(a => readnum(a));
let readword = (a) => a.split('\n');
let readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let arr = readword(input).map(readnum);
  let sample = arr.slice(0, 10);

  function getLambda(a1, b1, c1, i1, a2, b2, c2, i2) {
    let det = (c1 - a1) * (i2 - b2) - (c2 - a2) * (i1 - b1);
    if (det == 0)
      return null;

    return Math.round(((i2 - b2) * (c2 - a1) + (a2 - c2) * (i2 - b1)) / det);
  }

  function getPoint(a, b, i1 = 0, i2 = 1) {
    let lambda = getLambda(
      a[i1], a[i2], a[i1] + a[i1 + 3], a[i2] + a[i2 + 3],
      b[i1], b[i2], b[i1] + b[i1 + 3], b[i2] + b[i2 + 3],
    );

    if (lambda == null) return null;

    let f = a[i1] + lambda * a[i1 + 3], g = a[i2] + lambda * a[i2 + 3];
    return [f, g];
  }

  function getPointSeries(v, i1 = 0, i2 = 1) {
    let cur;

    let transformed = sample.map(line => {
      let copy = line.slice();
      copy[i1 + 3] += v[0];
      copy[i2 + 3] += v[1];
      return copy;
    });

    for (let i = 0; i < transformed.length; i++) {
      for (let j = i + 1; j < transformed.length; j++) {

        let a = transformed[i], b = transformed[j];
        let point = getPoint(a, b, i1, i2);
        if (point == null) return;

        if (!cur) cur = point;

        if (point[0] != cur[0] || point[1] != cur[1]) return false;
      }
    }

    return cur;
  }

  for (let a = 0; ; a++) {
    for (let b = 0; b <= a; b++) {
      for (let [x, y] of [[a, b], [b, a]]) {
        for (let [sx, sy] of darr) {
          let xy = getPointSeries([x * sx, y * sy], 0, 1);
          if (!xy) continue;

          for (let z = 0; ; z++) {
            for (let sz of [1, -1]) {
              let xz = getPointSeries([x * sx, z * sz], 0, 2);
              if (!xz) continue;

              return xy[0] + xy[1] + xz[1];
            }
          }
        }
      }
    }
  }
}
console.log(B(input));