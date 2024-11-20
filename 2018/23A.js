const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim(); const log = (...a) => console.log(...a); const dmap = new Map([['N', [1, 0]], ['S', [-1, 0]], ['W', [0, -1]], ['E', [0, 1]], ['NE', [1, 1]], ['SE', [-1, 1]], ['SW', [-1, -1]], ['NW', [1, -1]], ['U', [-1, 0]], ['D', [1, 0]], ['L', [0, -1]], ['R', [0, 1]], ['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]); const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]]; const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]]; const dstr = 'NESW'; const cp = (state) => JSON.parse(JSON.stringify(state)); const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C; const count = (t, p) => (t.match(new RegExp(p, 'g')) || []).length;
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);

  let max = 0, pos;

  for (let [x, y, z, r] of arr)
    if (r > max)
      max = r, pos = [x, y, z];

  let [px, py, pz] = pos;

  for (let [x, y, z, r] of arr)
    if (Math.abs(px - x) + Math.abs(py - y) + Math.abs(pz - z) <= max)
      res++;

  return res;
}

console.log(solve(input));