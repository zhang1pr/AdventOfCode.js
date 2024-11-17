const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim(); const log = (...a) => console.log(...a); const dmap = new Map([['N', [-1, 0]], ['S', [1, 0]], ['W', [0, -1]], ['E', [0, 1]], ['NE', [1, 1]], ['SE', [-1, 1]], ['SW', [-1, -1]], ['NW', [1, -1]], ['U', [-1, 0]], ['D', [1, 0]], ['L', [0, -1]], ['R', [0, 1]], ['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]); const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]]; const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]]; const dstr = 'NESW'; const cp = (state) => JSON.parse(JSON.stringify(state)); const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C; const count = (t, p) => (t.match(new RegExp(p, 'g')) || []).length;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  let pos = [];
  for (let i = 0; i < arr.length; i++)
    pos.push([i, -1, '>']), pos.push([i, C, '<']);
  for (let j = 0; j < arr[0].length; j++)
    pos.push([-1, j, 'v']), pos.push([R, j, '^']);

  function f(start) {
    let set = new Set(), set2 = new Set();
    let q = [start];
    while (q.length) {
      let nq = [];

      for (let [r, c, dir] of q) {
        let ndir;
        let ch = r == -1 || c == -1 || r == R || c == C ? '.' : arr[r][c];

        if (ch == '/') {
          if (dir == 'v') dir = '<';
          else if (dir == '<') dir = 'v';
          else if (dir == '>') dir = '^';
          else if (dir == '^') dir = '>';
        } else if (ch == '\\') {
          if (dir == 'v') dir = '>';
          else if (dir == '>') dir = 'v';
          else if (dir == '^') dir = '<';
          else if (dir == '<') dir = '^';
        } else if (ch == '-') {
          if (dir == 'v' || dir == '^')
            dir = '<', ndir = '>';
        } else if (ch == '|') {
          if (dir == '<' || dir == '>')
            dir = '^', ndir = 'v';
        }

        let [dr, dc] = dmap.get(dir);
        let nr = dr + r, nc = dc + c, str = nr + ',' + nc, dstr = str + ',' + dir;


        if (isIn(nr, nc, R, C) && !set2.has(dstr)) {
          set.add(str);
          set2.add(dstr);
          nq.push([nr, nc, dir]);
        }

        if (ndir == null) continue;
        [dr, dc] = dmap.get(ndir);
        nr = dr + r, nc = dc + c, str = nr + ',' + nc, dstr = str + ',' + ndir;

        if (isIn(nr, nc, R, C) && !set2.has(dstr)) {
          set.add(str);
          set2.add(dstr);
          nq.push([nr, nc, ndir]);
        }
      }

      q = nq;
    }

    return set.size;
  }

  for (let x of pos)
    res = Math.max(res, f(x));

  return res;
}