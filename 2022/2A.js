const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword2d(input);
  let s1 = 'ABC', s2 = 'XYZ';

  for (let [a, b] of arr) {
    let i1 = s1.indexOf(a), i2 = s2.indexOf(b);
    res += i2 + 1;

    if (i1 == i2)
      res += 3;
    else if (i2 == (i1 + 1) % 3)
      res += 6;
  }

  return res;
}