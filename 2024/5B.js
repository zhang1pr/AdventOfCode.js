const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), set = new Set(), res = 0;
  let arr = readword(input);
  let update;

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      update = arr.slice(i + 1);
      break;
    }

    set.add(arr[i]);
  }

  for (let row of update) {
    row = row.split(',').map(a => +a);

    let nrow = row.toSorted((a, b) => set.has(a + '|' + b) ? -1 : 1);

    if (row.join(',') == nrow.join(',')) continue;

    res += nrow[nrow.length >> 1];
  }

  return res;
}

console.log(solve(input));