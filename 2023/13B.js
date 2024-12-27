const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input);
  arr.push('');

  function getLine(cur, num) {
    let col = [], R = cur.length, C = cur[0].length;
    for (let c = 0; c < C; c++) {
      let str = '';
      for (let r = 0; r < R; r++) str += cur[r][c];

      col.push(str);
    }

    for (let line = 1; line < R; line++) {
      let f = true;
      for (let i = line - 1, j = line; i >= 0 && j < R; i--, j++)
        if (cur[i] != cur[j]) f = false;

      if (f && line * 100 != num) { return line * 100; }
    }

    for (let line = 1; line < C; line++) {
      let f = true;
      for (let i = line - 1, j = line; i >= 0 && j < C; i--, j++)
        if (col[i] != col[j]) f = false;

      if (f && line != num) { return line; }
    }

    return -1;
  }

  let cur = [];

  function getNewLine(cur) {
    let R = cur.length, C = cur[0].length;
    let num = getLine(cur);
    cur = cur.map(a => a.split(''));

    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        cur[r][c] = cur[r][c] == '#' ? '.' : '#';

        let res = getLine(cur.map(a => a.join('')), num);

        if (res != -1)
          return res;

        cur[r][c] = cur[r][c] == '#' ? '.' : '#';
      }
    }

    return;
  }

  for (let x of arr) {
    if (x == '') {
      res += getNewLine(cur);
      cur = [];
    } else {
      cur.push(x);
    }
  }

  return res;
}

console.log(solve(input));