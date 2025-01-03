const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['N', [1, 0]], ['S', [-1, 0]], ['W', [0, -1]], ['E', [0, 1]], [1, 0]]);
const dstr = 'NESW';
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = input.split(', ');
  let idx = 0, r = 0, c = 0;

  for (let item of arr) {
    let dir = item[0], num = item.slice(1);
    dir = dir == 'L' ? -1 : 1;
    idx = (idx + dir + 4) % 4;
    let [dr, dc] = dmap.get(dstr[idx]);
    r += num * dr;
    c += num * dc;
  }

  return Math.abs(r) + Math.abs(c);
}

console.log(solve(input));