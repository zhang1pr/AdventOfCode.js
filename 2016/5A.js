const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));
const crypto = require('crypto');

function solve(input) {
  let str = input;
  let num = 0, i = 0;
  let res = '';

  while (i < 8) {
    let cur = str + num;
    let hex = crypto.createHash('md5').update(cur).digest('hex');

    if (hex.startsWith('00000')) {
      res += hex[5];
      i++;
    }

    num++;
  }

  return res;
}

console.log(solve(input));