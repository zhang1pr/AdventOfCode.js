const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = 0;
  let arr = readnum2d(input);
  let getNei = ([a, b, c]) => [[a + 1, b, c], [a - 1, b, c], [a, b + 1, c], [a, b - 1, c], [a, b, c + 1], [a, b, c - 1]];

  for (let cube of arr) {
    for (let cur of getNei(cube))
      if (set.has(cur.join()))
        res -= 2;

    set.add(cube.join());
  }

  return res + arr.length * 6;
}

console.log(solve(input));