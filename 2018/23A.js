const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);

  let max = 0, pos;

  for (let [x, y, z, r] of arr)
    if (r > max)
      max = r, pos = [x, y, z];

  let [px, py, pz] = pos;

  for (let [x, y, z, r] of arr)
    if (Math.abs(px - x) + Math.abs(py - y) + Math.abs(pz - z) <= max)
      res++;

  return res;
}

console.log(solve(input));