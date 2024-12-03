const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);
  let A = [], B = [];

  for (let [a, b] of arr)
    A.push(a), B.push(b);

  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  for (let i = 0; i < A.length; i++) {
    let cnt = 0;

    for (let j = 0; j < A.length; j++)
      if (A[i] == B[j])
        cnt++;

    res += cnt * A[i];
  }

  return res;
}

console.log(solve(input));