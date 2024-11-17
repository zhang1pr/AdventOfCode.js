const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = input.split(',');
  let str = 'abcdefghijklmnop';

  for (let ins of arr) {
    if (ins.startsWith('s')) {
      let [idx] = readnum(ins);
      str = str.slice(-idx) + str.slice(0, -idx);
    } else if (ins.startsWith('x')) {
      let [a, b] = readnum(ins);
      if (a > b)
        [a, b] = [b, a];
      str = str.slice(0, a) + str[b] + str.slice(a + 1, b) + str[a] + str.slice(b + 1);
    } else if (ins.startsWith('p')) {
      let charA = ins[1], charB = ins[3];
      let [a, b] = [str.indexOf(charA), str.indexOf(charB)];

      if (a > b)
        [a, b] = [b, a];
      str = str.slice(0, a) + str[b] + str.slice(a + 1, b) + str[a] + str.slice(b + 1);
    }
  }

  return str;
}