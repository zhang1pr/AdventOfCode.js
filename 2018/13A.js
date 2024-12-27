const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');
const dmap = new Map([['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]);
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword(input);
  let carts = [];
  let dstr = 'v<^>';

  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr[0].length; j++)
      if (dstr.includes(arr[i][j])) {
        if (arr[i][j] == 'v' || arr[i][j] == '^') {
          arr[i][j] = '|';
        } else {
          arr[i][j] = '-';
        }

        carts.push([i, j, arr[i][j], 0]);
      }

  carts.sort((a, b) => a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);

  while (true) {
    let ncarts = [];
    let oldCartSet = new Set();
    let cartSet = new Set();

    for (let [r, c] of carts)
      oldCartSet.add(c + ',' + r);

    for (let [r, c, dir, turnIdx] of carts) {
      oldCartSet.delete(c + ',' + r);

      let [dr, dc] = dmap.get(dir);
      let dirIdx = dstr.indexOf(dir);

      if (arr[r][c] == '+') {
        if (turnIdx == 0) {
          dirIdx--;
        } else if (turnIdx == 2) {
          dirIdx++;
        }

        turnIdx = (turnIdx + 1) % 3;
      } else if (arr[r][c] == '/') {
        dirIdx += dr ? 1 : -1;
      } else if (arr[r][c] == '\\') {
        dirIdx += dc ? 1 : -1;
      }

      dirIdx = (dirIdx + 4) % 4;
      dir = dstr[dirIdx];
      [dr, dc] = dmap.get(dir);
      r += dr;
      c += dc;

      let str = c + ',' + r;
      if (cartSet.has(str) || oldCartSet.has(str)) {
        return str;
      } else {
        cartSet.add(str);
      }

      ncarts.push([r, c, dir, turnIdx]);
    }

    carts = ncarts.sort((a, b) => a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
  }
}

console.log(solve(input));