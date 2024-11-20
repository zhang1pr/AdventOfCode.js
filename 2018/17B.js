const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword(input);
  let miny = Infinity, maxy = 0, maxx = 500;
  let curx = 500, cury = 0, res = 0, done = false;

  for (let i = 0; i < arr.length; i++) {
    let [str] = arr[i];
    let [a, b, c] = arr[i].match(/\d+/g).map(a => +a);

    if (str == 'x') {
      miny = Math.min(miny, b);
      maxy = Math.max(maxy, c);
      maxx = Math.max(maxx, a);
    } else {
      miny = Math.min(miny, a);
      maxy = Math.max(maxy, a);
      maxx = Math.max(maxx, c);
    }
  }

  let grid = [...Array(maxx + 3)].map(() => Array(maxy + 3).fill(0));

  for (let i = 0; i < arr.length; i++) {
    let [str] = arr[i];
    let [a, b, c] = arr[i].match(/\d+/g).map(a => +a);

    if (str == 'x')
      for (let y = b; y <= c; y++)
        grid[a][y] = 1;
    else
      for (let x = b; x <= c; x++)
        grid[x][a] = 1;
  }

  while (true) {
    if (done) {
      curx = 500;
      cury = 0;
      done = false;
    }

    while (grid[curx][cury + 1] == 0 && cury < maxy)
      cury++;

    if (cury == maxy) {
      done = true;
      grid[curx][cury] = 3;
      continue;
    } else if (cury < miny) {
      break;
    }

    if (grid[curx - 1][cury] == 0)
      while (grid[curx - 1][cury] == 0 && (grid[curx][cury + 1] == 1 || grid[curx][cury + 1] == 2))
        curx--;
    else if (grid[curx + 1][cury] == 0)
      while (grid[curx + 1][cury] == 0 && (grid[curx][cury + 1] == 1 || grid[curx][cury + 1] == 2))
        curx++;

    if (grid[curx][cury + 1] != 0) {
      done = true;

      if (grid[curx][cury + 1] == 3 || grid[curx + 1][cury] == 3 || grid[curx - 1][cury] == 3) {
        grid[curx][cury] = 3;

        let x = curx;
        while (grid[x - 1][cury] == 2) {
          grid[x - 1][cury] = 3;
          x--;
        }

        x = curx;
        while (grid[x + 1][cury] == 2) {
          grid[x + 1][cury] = 3;
          x++;
        }
      } else {
        grid[curx][cury] = 2;
      }
    }
  }

  for (let i = 0; i <= maxx; i++)
    for (let j = 0; j <= maxy; j++)
      if (grid[i][j] == 2)
        res++;

  return res;
}

console.log(solve(input));