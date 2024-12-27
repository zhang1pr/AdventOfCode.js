const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input).filter(a => a.startsWith('/'));

  for (let i = 0; i < arr.length; i++) {
    let [x1, y1, size1, used1, avail1, use1] = readnum(arr[i]);
    if (used1 == 0) continue;

    for (let j = 0; j < arr.length; j++) {
      if (i == j) continue;

      let [x2, y2, size2, used2, avail2, use2] = readnum(arr[j]);

      if (used1 <= avail2) {
        res++;
      }
    }
  }

  return res;
}

console.log(solve(input));