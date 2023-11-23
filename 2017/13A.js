const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readnum2d(input);

  for (let [depth, range] of arr) {
    let pos = depth % (2 * range - 2);

    if (pos == 0) {
      res += depth * range;
    }
  }

  return res;
}