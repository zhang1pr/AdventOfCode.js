const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = 0;
  let arr = readword(input);
  let len = arr.length;
  let half = (len - 1) / 2;

  for (let i = 0; i < len; i++)
    for (let j = 0; j < len; j++)
      if (arr[i][j] == '#')
        set.add((j - half) + ',' + (half - i));

  let r = 0, c = 0;
  let didx = 0;

  for (let rd = 1; rd <= 10000; rd++) {
    let str = r + ',' + c;
    if (set.has(str)) {
      set.delete(str);
      didx = (didx + 1) % 4;
    } else {
      set.add(str);
      didx = (didx + 3) % 4;
      res++;
    }

    let [dr, dc] = darr[didx];
    r += dr, c += dc;

  }

  return res;
}

console.log(solve(input));