const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input);

  function dfs(depth, str, index, row) {
    if (depth == 0) {
      res += +str;
      return;
    }

    for (let i = 9; i >= 1; i--) {
      let nindex = row.indexOf(i.toString(), index);

      if (nindex == -1 || nindex > row.length - depth) continue;

      dfs(depth - 1, str + i.toString(), nindex + 1, row);

      break;
    }
  }

  for (let row of arr)
    dfs(12, '', 0, row);

  return res;
}

console.log(solve(input));