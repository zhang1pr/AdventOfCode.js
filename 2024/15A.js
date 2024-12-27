const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]);
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let [fir, sec] = input.split('\n\n');
  let arr = readword(fir).map(a => a.split('')), R = arr.length, C = arr[0].length * 2;
  sec = readword(sec).join('');

  let r, c;
  for (let i = 0; i < R; i++)
    for (let j = 0; j < C; j++)
      if (arr[i][j] == '@')
        r = i, c = j, arr[i][j] = '.';

  for (let ch of sec) {
    let [dr, dc] = dmap.get(ch);
    let nr = r + dr, nc = c + dc;
    let cr = nr, cc = nc;

    if (arr[nr][nc] == '#') continue;

    if (arr[nr][nc] == '.') {
      r = nr, c = nc;
      continue;
    }

    while (arr[cr][cc] == 'O')
      cr += dr, cc += dc;

    if (arr[cr][cc] != '.') continue;

    while (cr != nr || cc != nc) {
      arr[cr][cc] = 'O';
      cr -= dr, cc -= dc;
    }

    arr[cr][cc] = '.';
    r = nr, c = nc;
  }

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (arr[r][c] == 'O')
        res += r * 100 + c;

  return res;
}

console.log(solve(input));