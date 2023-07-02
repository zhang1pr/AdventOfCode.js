const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');
const darr = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let arr = readword(input);
  let str = arr.at(-1);
  arr.pop();
  arr.pop();

  let ins = 'X';
  for (let ch of str) {
    if (ch == 'L' || ch == 'R')
      ins += ' ';
    ins += ch;
  }
  ins = ins.split(' ');

  let R = arr.length, C = 0;
  for (let row of arr) 
    C = Math.max(C, row.length);
  for (let i=0;i<arr.length;i++)
    arr[i] = arr[i].padEnd(C, ' ');

  let x = 0, y = arr[0].indexOf('.');
  let d = 0;

  function walk(x, y, d, steps) {
    while (steps) {
      steps--;
      let nx = x, ny = y;
      let [dx, dy] = darr[d];
    
      do {
        x = (x + dx + R) % R;
        y = (y + dy + C) % C
      } while (arr[x][y] == ' ');

      if (arr[x][y] == '#')
        return [nx, ny];
    }

    return [x, y];
  };

  for (let move of ins) {
    let steps = +move.slice(1), c = move[0];

    if (c == 'R')
      d = (d+1) % 4;
    else if (c == 'L')
      d = (d+3) % 4;

    [x, y] = walk(x, y, d, steps);
  }

  return (x + 1) * 1000 + (y + 1) * 4 + d;
}
