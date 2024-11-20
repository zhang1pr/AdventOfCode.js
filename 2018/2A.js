const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let double = 0, triple = 0;
  let arr = readword(input);

  for (let word of arr) {
    let map = new Map();

    for (let ch of word) map.set(ch, (map.get(ch) || 0) + 1);
    let set = new Set(map.values());

    if (set.has(2)) double++;
    if (set.has(3)) triple++;
  }

  return double * triple;
}

console.log(solve(input));