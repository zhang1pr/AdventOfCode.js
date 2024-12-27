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
  let end, period;
  let map = new Map();

  for (let time = 1; time; time++) {
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

    let str = narr.map(a => a.join('')).join('');
    if (!map.has(str)) {
      map.set(str, time);
    } else {
      end = time;
      period = end - map.get(str);
      break;
    }

    arr = narr;
  }

  map = new Map([...map].map(a => a.reverse()));

  let cur = 1000000000;

  while (cur > end)
    cur -= period;

  let t = 0, l = 0;

  for (let ch of map.get(cur)) {
    if (ch == '|') t++;
    if (ch == '#') l++;
  }

  return t * l;
}

console.log(solve(input));