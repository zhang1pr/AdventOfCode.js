const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]);
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set().add('0,0');
  let arr = input;

  let r = 0, c = 0;

  for (let ch of arr) {
    let [dr, dc] = dmap.get(ch);

    r += dr, c += dc;
    let str = r + ',' + c;

    set.add(str);
  }

  return set.size;
}

console.log(solve(input));