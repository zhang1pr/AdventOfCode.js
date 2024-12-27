const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword2d(input);
  let t = '', d = '';

  for (let j = 1; j < arr[0].length; j++)
    t += arr[0][j], d += arr[1][j];
  t = +t, d = +d;

  for (let sp = 0; sp <= t; sp++)
    if (sp * (t - sp) > d)
      res++;

  return res;
}

console.log(solve(input));