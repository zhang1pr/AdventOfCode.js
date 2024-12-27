const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword(input).map(a => a.split('')), R = arr.length, C = arr[0].length;

  for (let time = 1; time <= 10; time++) {
    let narr = arr.map(a => a.slice());

    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        let t = 0, l = 0;

        for (let [di, dj] of ddarr) {
          let ni = i + di, nj = j + dj;

          if (!isIn(ni, nj, R, C)) continue;

          if (arr[ni][nj] == '|') t++;
          if (arr[ni][nj] == '#') l++;
        }

        if (arr[i][j] == '.' && t >= 3)
          narr[i][j] = '|';

        if (arr[i][j] == '|' && l >= 3)
          narr[i][j] = '#';

        if (arr[i][j] == '#' && (t == 0 || l == 0))
          narr[i][j] = '.';
      }
    }

    arr = narr;
  }

  let t = 0, l = 0;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (arr[i][j] == '|') t++;
      if (arr[i][j] == '#') l++;
    }
  }

  return t * l;
}

console.log(solve(input));