const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);

  function canBeCaught(delay) {
    for (let [depth, range] of arr) {
      let pos = (depth + delay) % (2 * range - 2);

      if (pos == 0)
        return true;
    }

    return false;
  }

  while (true) {
    if (canBeCaught(res)) {
      res++;
    } else {
      break;
    }
  }

  return res;
}

console.log(solve(input));