const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readword(input);

  for (let i = 0; i < arr.length; i++) {
    let bag = arr[i].split(': ')[1];
    let [left, right] = bag.split(' | ').map(a => a.trim().split(/\s+/).map(x => +x));

    let set = new Set(right);
    let cnt = 0;

    for (let x of left)
      if (set.has(x))
        cnt++;

    res += cnt ? 2 ** (cnt - 1) : 0;
  }

  return res;
}