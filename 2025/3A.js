const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input);

  for (let row of arr) {
    for (let i = 9; i >= 1; i--) {
      let pos1 = row.indexOf(i.toString());

      if (pos1 == -1 || pos1 == row.length - 1) continue;

      for (let j = 9; j >= 1; j--) {
        let pos2 = row.indexOf(j.toString(), pos1 + 1);

        if (pos2 == -1) continue;

        res += +(row[pos1] + row[pos2]);
        break;
      }

      break;
    }
  }

  return res;
}

console.log(solve(input));