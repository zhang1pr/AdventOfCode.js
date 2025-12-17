const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0, map = new Map();
  let arr = readword(input), R = arr.length;

  function DFS(r, c) {
    if (r == R) {
      return 1;
    }


    if (map.has(r + ',' + c))
      return map.get(r + ',' + c);

    let res;
    if (arr[r][c] == '^') {
      res = DFS(r, c - 1) + DFS(r, c + 1);
    } else {
      res = DFS(r + 1, c);
    }

    map.set(r + ',' + c, res);
    return res;
  }

  for (let i = 0; i < arr.length; i++)
    if (arr[0][i] == 'S')
      return DFS(0, i);
}

console.log(solve(input));