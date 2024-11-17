const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input)[0].split(',');
  let slots = [...Array(256)].map(() => new Map());

  for (let str of arr) {
    let cur = 0;
    for (let ch of str) {
      if (ch == '-' || ch == '=') break;

      cur += ch.charCodeAt();
      cur *= 17;
      cur %= 256;
    }

    if (str.at(-1) == '-') str += '-';

    let v = str.at(-1), op = str.at(-2);
    let s = str.slice(0, -2);
    let map = slots[cur];

    if (op == '-') map.delete(s);
    else map.set(s, v);
  }

  for (let i = 0; i < 256; i++) {
    let map = slots[i];

    let cnt = 1;
    for (let [str, val] of map) {
      res += (i + 1) * cnt * val;
      cnt++;
    }
  }

  return res;
}