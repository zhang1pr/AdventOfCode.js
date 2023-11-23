const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0;
  let arr = readnum(input);

  let i = 0;
  while (i < arr.length) {
    let diff = arr[i] >= 3 ? -1 : 1;
    arr[i] += diff;
    i += arr[i] - diff;
    res++;
  }

  return res;
}