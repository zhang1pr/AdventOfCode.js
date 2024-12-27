const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = input.split('\n\n').map(readword);
  let A = [], B = [];

  for (let shape of arr) {
    let R = shape.length, C = shape[0].length;
    let target = shape[0][0] == '.' ? A : B;
    let arr = [];

    for (let c = 0; c < C; c++)
      for (let r = 0; r < R - 1; r++)
        if (shape[r][c] != shape[r + 1][c])
          arr.push(r);

    target.push(arr);
  }

  for (let arr1 of A)
    for (let arr2 of B)
      if (arr1.every((a, idx) => a >= arr2[idx]))
        res++;

  return res;
}

console.log(solve(input));