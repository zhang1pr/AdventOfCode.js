const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim(); const log = (...a) => console.log(...a); const dmap = new Map([['N', [1, 0]], ['S', [-1, 0]], ['W', [0, -1]], ['E', [0, 1]], ['NE', [1, 1]], ['SE', [-1, 1]], ['SW', [-1, -1]], ['NW', [1, -1]], ['U', [-1, 0]], ['D', [1, 0]], ['L', [0, -1]], ['R', [0, 1]], ['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]); const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]]; const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]]; const dstr = 'NESW'; const cp = (state) => JSON.parse(JSON.stringify(state)); const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C; const count = (t, p) => (t.match(new RegExp(p, 'g')) || []).length;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword2d(input);
  let rank = [...Array(7)].map(() => []);
  let str = 'AKQJT98765432';

  let f = (a, b) => {
    let c = a[0], d = b[0];
    for (let i = 0; i < 5; i++) {
      if (c[i] == d[i]) continue;
      else return str.indexOf(d[i]) - str.indexOf(c[i]);
    }
  };

  for (let [x, v] of arr) {
    let map = new Map();

    for (let ch of x)
      map.set(ch, (map.get(ch) || 0) + 1);

    let mapArr = [...map.values()].sort((a, b) => b - a);

    if (mapArr[0] == 5) rank[0].push([x, v]);
    if (mapArr[0] == 4) rank[1].push([x, v]);
    if (mapArr[0] == 3) +mapArr[1] == 2 ? rank[2].push([x, v]) : rank[3].push([x, v]);
    if (mapArr[0] == 2) +mapArr[1] == 2 ? rank[4].push([x, v]) : rank[5].push([x, v]);
    if (mapArr[0] == 1) rank[6].push([x, v]);
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

log(A(input));