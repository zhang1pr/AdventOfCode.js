const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim(); const log = (...a) => console.log(...a); const dmap = new Map([['N', [1, 0]], ['S', [-1, 0]], ['W', [0, -1]], ['E', [0, 1]], ['NE', [1, 1]], ['SE', [-1, 1]], ['SW', [-1, -1]], ['NW', [1, -1]], ['U', [-1, 0]], ['D', [1, 0]], ['L', [0, -1]], ['R', [0, 1]], ['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]); const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]]; const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]]; const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C; const cp = (state) => JSON.parse(JSON.stringify(state)); const count = (t, p) => (t.match(new RegExp(p, 'g')) || []).length;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), set = new Set(), res = 0, t = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      let x = arr[r][c];


    }
  }

  return res;
}

console.log(solve(input));