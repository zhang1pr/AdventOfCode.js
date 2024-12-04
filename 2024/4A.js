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
      let cand = [];
      cand.push(arr[i].slice(j, j + 4));
      if (i + 3 < R)
        cand.push(arr[i][j] + arr[i + 1][j] + arr[i + 2][j] + arr[i + 3][j]);

      if (i + 3 < R && j + 3 < C)
        cand.push(arr[i][j] + arr[i + 1][j + 1] + arr[i + 2][j + 2] + arr[i + 3][j + 3]);

      if (i >= 3 && j + 3 < C)
        cand.push(arr[i][j] + arr[i - 1][j + 1] + arr[i - 2][j + 2] + arr[i - 3][j + 3]);

      for (let c of cand)
        if (c == 'XMAS' || c == 'SAMX') res++;
    }
  }

  return res;
}

console.log(solve(input));