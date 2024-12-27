const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword2d(input);
  let reg = 'abcd';
  let map = new Map();

  for (let ch of reg)
    map.set(ch, 0);
  map.set('c', 1);

  let i = 0;
  while (i < arr.length) {
    let ins = arr[i];

    if (ins[0] == 'cpy') {
      let num = Number.isInteger(+ins[1]) ? +ins[1] : map.get(ins[1]);
      map.set(ins[2], num);
    } else if (ins[0] == 'inc') {
      map.set(ins[1], map.get(ins[1]) + 1);
    } else if (ins[0] == 'dec') {
      map.set(ins[1], map.get(ins[1]) - 1);
    } else {
      let num = Number.isInteger(ins[1]) ? +ins[1] : map.get(ins[1]);
      if (num != 0) {
        i += +ins[2];
        continue;
      }
    }

    i++;
  }

  return map.get('a');
}

console.log(solve(input));