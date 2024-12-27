const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let matches = input.matchAll(/mul[(](\d+),(\d+)[)]|do[(][)]|don't[(][)]/g);
  let f = true;

  for (let [match, a, b] of matches) {
    if (match == 'do()')
      f = true;
    else if (match == 'don\'t()')
      f = false;
    else if (f)
      res += a * b;
  }

  return res;
}

console.log(solve(input));