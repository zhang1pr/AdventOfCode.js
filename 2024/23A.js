const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), set = new Set();
  let arr = readword(input);

  for (let line of arr) {
    let [u, v] = line.split('-');

    if (!map.has(u)) map.set(u, []);
    map.get(u).push(v);
    if (!map.has(v)) map.set(v, []);
    map.get(v).push(u);
  }

  for (let x of map.keys())
    for (let y of map.get(x))
      for (let z of map.get(y))
        for (let x2 of map.get(z))
          if (x2 == x && [x[0], y[0], z[0]].includes('t'))
            set.add([x, y, z].sort().join(','));

  return set.size;
}

console.log(solve(input));