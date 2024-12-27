const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0, SIZE = 4;
  let arr = readword(input);

  for (let str of arr) {
    let map = new Map();

    for (let i = 0; i < SIZE; i++)
      map.set(str[i], (map.get(str[i]) || 0) + 1);

    if (map.size == SIZE)
      res += SIZE + 1;
    else
      for (let i = SIZE; i < str.length; i++) {
        map.set(str[i], (map.get(str[i]) || 0) + 1);
        map.set(str[i - SIZE], map.get(str[i - SIZE]) - 1);

        if (map.get(str[i - SIZE]) == 0)
          map.delete(str[i - SIZE]);

        if (map.size == SIZE) {
          res += i + 1;
          break;
        }
      }
  }

  return res;
}

console.log(solve(input));