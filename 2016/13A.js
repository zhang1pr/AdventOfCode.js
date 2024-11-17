const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  input = Number(input);
  let t = 0;
  let q = [[1, 1]], set = new Set().add('1,1');

  let hash = (x, y) => x * x + 3 * x + 2 * x * y + y + y * y + input;
  let isOpen = (x) => [...x.toString(2)].filter(a => a == 1).length % 2 == 0;

  while (q.length) {
    let nq = [];
    t++;
    for (let [x, y] of q) {
      for (let [dx, dy] of darr) {
        let nx = x + dx, ny = y + dy, str = nx + ',' + ny;

        if (!set.has(str) && isIn(nx, ny, Infinity, Infinity) && isOpen(hash(nx, ny))) {
          if (nx == 31 && ny == 39) {
            return t;
          } else {
            nq.push([nx, ny]);
            set.add(str);
          }
        }
      }
    }

    q = nq;
  }
}