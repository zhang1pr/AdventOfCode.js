const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let infectedSet = new Set(), weakenedSet = new Set(), flaggedSet = new Set(), res = 0;
  let arr = readword(input);
  let len = arr.length;
  let half = (len - 1) / 2;

  for (let i = 0; i < len; i++)
    for (let j = 0; j < len; j++)
      if (arr[i][j] == '#')
        infectedSet.add((j - half) + ',' + (half - i));

  let r = 0, c = 0;
  let didx = 0;

  for (let rd = 1; rd <= 10000000; rd++) {
    let str = r + ',' + c;
    if (infectedSet.has(str)) {
      infectedSet.delete(str);
      flaggedSet.add(str);
      didx = (didx + 1) % 4;
    } else if (weakenedSet.has(str)) {
      weakenedSet.delete(str);
      infectedSet.add(str);
      res++;
    } else if (flaggedSet.has(str)) {
      flaggedSet.delete(str);
      didx = (didx + 2) % 4;
    } else {
      weakenedSet.add(str);
      didx = (didx + 3) % 4;
    }

    let [dr, dc] = darr[didx];
    r += dr, c += dc;
  }

  return res;
}

console.log(solve(input));