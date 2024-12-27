const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0;
  let arr = readword(input);
  let ins = arr[0];
  let cur = 'AAA';

  for (let i = 2; i < arr.length; i++) {
    let line = arr[i].split(' ');
    let cur = line[0], l = line[2].slice(1, -1), r = line[3].slice(0, -1);

    map.set(cur, [l, r]);
  }

  while (true) {
    for (let x of ins) {
      res++;
      let [l, r] = map.get(cur);

      cur = x == 'L' ? l : r;
    }

    if (cur.at(-1) == 'Z') break;
  }

  return res;
}

console.log(solve(input));