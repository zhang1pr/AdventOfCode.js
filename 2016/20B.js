const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0;
  let arr = readnum2d(input).sort((a, b) => a[0] - b[0]);
  arr.push([4294967296, 4294967296]);
  let last = 0;

  for (let [start, end] of arr) {
    res += Math.max(0, start - last - 1);
    last = Math.max(last, end);
  }

  return res;
}