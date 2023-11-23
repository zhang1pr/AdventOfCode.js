const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let parMap = new Map();
  let arr = readword(input);

  for (let row of arr) {
    let [tower, to] = row.split(' -> ');
    let [from, weight] = tower.split(' ');
    weight = readnum(weight)[0];

    if (to) {
      to = to.split(', ');

      for (let x of to) {
        parMap.set(x, from);
      }
    }
  }

  for (let row of arr) {
    let [tower] = row.split(' -> ');
    let [from] = tower.split(' ');

    if (!parMap.has(from)) {
      return from;
    }
  }
}