const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input).map(a => [...a]), R = arr.length, C = arr[0].length;

  for (let i = 0; i < R; i++)
    for (let j = 0; j < C; j++)
      if (arr[i][j] == 'O')
        while (i > 0 && arr[i - 1][j] == '.')
          [arr[i][j], arr[i - 1][j]] = [arr[i - 1][j], arr[i][j]], i--;

  for (let i = 0; i < R; i++)
    for (let j = 0; j < C; j++)
      if (arr[i][j] == 'O')
        res += R - i;

  return res;
}

console.log(solve(input));