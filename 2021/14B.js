const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), t = 0;
  let arr = readword(input);
  let words = arr.slice(2).map(a => a.split(' -> '));
  arr = arr[0];

  let cnt = new Map();
  for (let [[a, b], c] of words) {
    map.set(a + b, [a + c, c + b]);
  }

  for (let i = 1; i < arr.length; i++) {
    let pair = arr[i - 1] + arr[i];

    cnt.set(pair, (cnt.get(pair) || 0) + 1);
  }

  while (t < 40) {
    t++;

    let ncnt = new Map();

    for (let [k, v] of cnt) {
      for (let nei of map.get(k)) {
        ncnt.set(nei, (ncnt.get(nei) || 0) + v);
      }
    }

    cnt = ncnt;
  }

  let cmap = new Map().set(arr[0], 1).set(arr[arr.length - 1], 1);
  for (let [[a, b], v] of cnt) {
    cmap.set(a, (cmap.get(a) || 0) + v);
    cmap.set(b, (cmap.get(b) || 0) + v);
  }

  let max = Math.max(...cmap.values()), min = Math.min(...cmap.values());

  return (max - min) / 2;
}

console.log(solve(input));