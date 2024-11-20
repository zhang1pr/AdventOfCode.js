const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0, tmp = '.', t = 0;
  let arr = readword(input);
  let check = arr[0];

  arr = arr.slice(2);
  arr = arr.map(a => [...a]);

  while (t < 2) {
    t++;

    let narr = [];

    for (let i = -1; i <= arr.length; i++) {
      let cur = [];

      for (let j = -1; j <= arr.length; j++) {
        let str = '';

        for (let a = i - 1; a <= i + 1; a++) {
          for (let b = j - 1; b <= j + 1; b++) {
            if (arr[a] == null || arr[a][b] == null) {
              str += tmp == '#' ? '1' : '0';
            } else {
              str += arr[a][b] == '#' ? '1' : '0';
            }
          }
        }

        cur.push(check[parseInt(str, 2)]);
      }

      narr.push(cur);
    }

    arr = narr;

    if (tmp == '.') {
      tmp = check[0];
    } else {
      tmp = check[arr.length - 1];
    }
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      let cur = arr[i][j];

      if (cur == '#') res++;
    }
  }

  return res;
}

console.log(solve(input));