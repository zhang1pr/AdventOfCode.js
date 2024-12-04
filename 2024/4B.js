const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (i >= arr.length - 2 || j >= arr[i].length - 2) continue;

      let a = arr[i][j], b = arr[i][j + 2];
      let c = arr[i + 2][j], d = arr[i + 2][j + 2], e = arr[i + 1][j + 1];

      if (e != 'A' || a != b && a != c || d != b && d != c) continue;

      let cntM = 0, cntS = 0;

      for (let x of [a, b, c, d])
        if (x == 'M')
          cntM++;
        else if (x == 'S')
          cntS++;

      if (cntM == 2 && cntS == 2)
        res++;
    }
  }

  return res;
}

console.log(solve(input));