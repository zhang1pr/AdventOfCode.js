const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]);
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let [fir, sec] = input.split('\n\n');
  let arr = readword(fir), R = arr.length, C = arr[0].length * 2;
  sec = readword(sec).join('');

  let narr = [];

  for (let row of arr) {
    let cur = '';
    for (let ch of row)
      if (ch == 'O')
        cur += '[]';
      else if (ch == '@')
        cur += '@.';
      else
        cur += ch + ch;

    narr.push(cur.split(''));
  }

  let r, c;
  for (let i = 0; i < R; i++)
    for (let j = 0; j < C; j++)
      if (narr[i][j] == '@')
        r = i, c = j, narr[i][j] = '.';

  for (let ch of sec) {
    let [dr, dc] = dmap.get(ch);
    let nr = r + dr, nc = c + dc;
    let cr = nr, cc = nc;

    if (narr[nr][nc] == '#') continue;

    if (narr[nr][nc] == '.') {
      r = nr, c = nc;
      continue;
    }

    if (ch == '<' || ch == '>') {
      while (narr[cr][cc] == '[' || narr[cr][cc] == ']')
        cc += dc;

      if (narr[cr][cc] != '.') continue;

      while (cr != nr || cc != nc) {
        narr[cr][cc] = narr[cr - dr][cc - dc];
        cc -= dc;
      }

      narr[cr][cc] = '.';
      c = nc;
      continue;
    }

    let boxes = new Set();

    if (!DFS(nr, nc, dr, boxes)) continue;

    let barr = [...boxes].map(a => a.split(',').map(a => +a));
    barr.sort((a, b) => ch == '^' ? a[0] - b[0] : b[0] - a[0]);

    for (let [r, c] of barr) {
      let pr = r - dr, pc = c;
      narr[r][c] = narr[pr][pc];
      narr[pr][pc] = '.';
    }

    r = nr;
  }

  function DFS(r, c, dr, boxes) {
    if (narr[r][c] == '#') return false;
    if (narr[r][c] == '.') return true;

    let nr = r + dr, nc = c;

    if (boxes.has(nr + ',' + nc)) return true;
    boxes.add(nr + ',' + nc);

    if (!DFS(nr, nc, dr, boxes)) return false;

    return narr[r][c] == '[' ? DFS(r, c + 1, dr, boxes) : DFS(r, c - 1, dr, boxes);
  }

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (narr[r][c] == '[')
        res += r * 100 + c;

  return res;
}

console.log(solve(input));