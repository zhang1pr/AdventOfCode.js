const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0, dial = 50;
  let arr = readword(input);

  for (let line of arr) {
    let dir = line[0], num = +line.slice(1);

    let unit = dir == 'L' ? -1 : 1;
    res += Math.floor(((100 + unit * dial) % 100 + num) / 100);
    dial = ((dial + unit * num) % 100 + 100) % 100;
  }

  return res;
}

console.log(solve(input));