const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let t = 0;
  let str = input;

  while (t < 50) {
    t++;
    let nstr = '';
    let cnt = 0;
    let cur = str[0];

    for (let ch of str) {
      if (ch == cur) {
        cnt++;
      } else {
        nstr += cnt + cur;
        cur = ch;
        cnt = 1;
      }
    }

    str = nstr + cnt + cur;
  }

  return str.length;
}

console.log(solve(input));