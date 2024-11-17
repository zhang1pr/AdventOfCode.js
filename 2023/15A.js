const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input)[0].split(',');

  for (let str of arr) {
    let cur = 0;

    for (let ch of str) {
      cur += ch.charCodeAt();
      cur *= 17;
      cur %= 256;
    }

    res += cur;
  }

  return res;
}