const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0, t = 0;
  let arr = readnum(input);

  for (let x of arr)
    map.set(x, (map.get(x) || 0) + 1);

  while (t < 25) {
    let nmap = new Map();
    t++;

    for (let [x, v] of map) {
      if (x == 0)
        nmap.set(1, (nmap.get(1) || 0) + v);
      else if (x.toString().length % 2 == 0) {
        let str = x.toString();
        let len = str.length;

        let first = +str.slice(0, len / 2), second = +str.slice(len / 2);

        nmap.set(first, (nmap.get(first) || 0) + v);
        nmap.set(second, (nmap.get(second) || 0) + v);
      } else
        nmap.set(x * 2024, (nmap.get(x * 2024) || 0) + v);
    }

    map = nmap;
  }

  for (let [x, v] of map)
    res += v;

  return res;
}

console.log(solve(input));