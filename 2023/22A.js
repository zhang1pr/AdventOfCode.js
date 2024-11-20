const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = 0;
  let arr = readword(input).map(readnum).sort((a, b) => a[2] - b[2]);
  let dotArr = [];

  for (let [x1, y1, z1, x2, y2, z2] of arr) {
    let dots = new Set();

    if (x1 == x2 && y1 == y2)
      for (let z = z1; z <= z2; z++)
        dots.add(x1 + ',' + y1 + ',' + z);

    if (x1 == x2 && z1 == z2)
      for (let y = y1; y <= y2; y++)
        dots.add(x1 + ',' + y + ',' + z1);

    if (y1 == y2 && z1 == z2)
      for (let x = x1; x <= x2; x++)
        dots.add(x + ',' + y1 + ',' + z1);

    for (let x of dots) set.add(x);
    dotArr.push(dots);
  }

  while (true) {
    let going = false;

    for (let i = 0; i < dotArr.length; i++) {
      let settle = true, dots = dotArr[i];

      for (let str of dots) {
        let [x, y, z] = str.split(',');
        if (z == 1) settle = false;
        z--;
        let nstr = x + ',' + y + ',' + z;
        if (set.has(nstr) && !dots.has(nstr)) settle = false;
      }

      if (settle) {
        let ndots = new Set();

        going = true;

        for (let str of dots) {
          set.delete(str);
          let [x, y, z] = str.split(',');
          z--;
          let nstr = x + ',' + y + ',' + z;
          set.add(nstr);
          ndots.add(nstr);
        }

        dotArr[i] = ndots;
      }
    }

    if (!going) break;
  }

  for (let i = 0; i < dotArr.length; i++) {
    let dots = dotArr[i];
    let nset = new Set(set);
    let ndotArr = dotArr.map(a => new Set(a));

    for (let str of dots)
      nset.delete(str);

    let falls = new Set();

    while (true) {
      let going = false;

      for (let j = 0; j < ndotArr.length; j++) {
        if (j == i) continue;

        let dots = ndotArr[j];
        let settle = true;

        for (let str of dots) {
          let [x, y, z] = str.split(',');
          if (z == 1) settle = false;
          z--;
          let nstr = x + ',' + y + ',' + z;
          if (nset.has(nstr) && !dots.has(nstr)) settle = false;
        }

        if (settle) {
          falls.add(j);
          let ndots = new Set();

          for (let str of dots) {
            nset.delete(str);
            let [x, y, z] = str.split(',');
            z--;
            let nstr = x + ',' + y + ',' + z;
            nset.add(nstr);
            ndots.add(nstr);
          }

          ndotArr[j] = ndots;
          going = true;
        }
      }

      if (!going) break;
    }

    if (falls.size == 0)
      res++;
  }

  return res;
}

console.log(solve(input));