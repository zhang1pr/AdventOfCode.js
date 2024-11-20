const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 1;
  let arr = readword2d(input);

  for (let j = 1; j < arr[0].length; j++) {
    let t = +arr[0][j], d = +arr[1][j];
    let cnt = 0;

    for (let sp = 0; sp <= t; sp++)
      if (sp * (t - sp) > d)
        cnt++;

    res *= cnt;
  }

  return res;
}

console.log(solve(input));