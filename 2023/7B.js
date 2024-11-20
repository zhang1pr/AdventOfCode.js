const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword2d(input);
  let rank = [...Array(7)].map(() => []);
  let str = 'AKQT98765432J';

  let f = (a, b) => {
    let c = a[0], d = b[0];
    for (let i = 0; i < 5; i++) {
      if (c[i] == d[i]) continue;
      else return str.indexOf(d[i]) - str.indexOf(c[i]);
    }
  };

  for (let [x, v] of arr) {
    let map = new Map();
    let cnt = 0;

    for (let ch of x)
      if (ch != 'J')
        map.set(ch, (map.get(ch) || 0) + 1);
      else
        cnt++;

    let mapArr = [...map.values()].sort((a, b) => b - a);

    if (cnt == 5 || mapArr[0] + cnt == 5) rank[0].push([x, v]);
    else if (mapArr[0] + cnt == 4) rank[1].push([x, v]);
    else if (mapArr[0] + cnt == 3) +mapArr[1] == 2 ? rank[2].push([x, v]) : rank[3].push([x, v]);
    else if (mapArr[0] + cnt == 2) +mapArr[1] == 2 ? rank[4].push([x, v]) : rank[5].push([x, v]);
    else if (mapArr[0] + cnt == 1) rank[6].push([x, v]);
  }

  let p = 0;

  for (let i = 6; i >= 0; i--) {
    rank[i].sort(f);

    for (let [x, v] of rank[i]) {
      p++;
      res += p * v;
    }
  }

  return res;
}

console.log(solve(input));