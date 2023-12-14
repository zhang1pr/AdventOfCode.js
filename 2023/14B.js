const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map(), res = 0;
  let arr = readword(input).map(a => [...a]);
  let R = arr.length, C = arr[0].length;

  function N(arr) {
    for (let i = 0; i < R; i++)
      for (let j = 0; j < C; j++)
        if (arr[i][j] == 'O')
          while (i > 0 && arr[i - 1][j] == '.')
            [arr[i][j], arr[i - 1][j]] = [arr[i - 1][j], arr[i][j]], i--;
  }

  function S(arr) {
    for (let i = R - 1; i >= 0; i--)
      for (let j = C - 1; j >= 0; j--)
        if (arr[i][j] == 'O')
          while (i < R - 1 && arr[i + 1][j] == '.')
            [arr[i][j], arr[i + 1][j]] = [arr[i + 1][j], arr[i][j]], i++;
  }

  function W(arr) {
    for (let i = 0; i < R; i++)
      for (let j = 0; j < C; j++)
        if (arr[i][j] == 'O')
          while (j > 0 && arr[i][j - 1] == '.')
            [arr[i][j], arr[i][j - 1]] = [arr[i][j - 1], arr[i][j]], j--;
  }

  function E(arr) {
    for (let i = R - 1; i >= 0; i--)
      for (let j = C - 1; j >= 0; j--)
        if (arr[i][j] == 'O')
          while (j < C - 1 && arr[i][j + 1] == '.')
            [arr[i][j], arr[i][j + 1]] = [arr[i][j + 1], arr[i][j]], j++;
  }

  let fs = [N, W, S, E], f = true, cycle = 1000000000;
  for (let i = 1; i <= cycle; i++) {
    for (let f of fs)
      f(arr);

    let key = arr.map(a => a.join('')).join('');

    if (f && map.has(key)) {
      f = false;
      let P = i - map.get(key);
      let div = Math.floor((cycle - i) / P);
      i += div * P;
    }

    map.set(key, i);
  }

  for (let i = 0; i < R; i++)
    for (let j = 0; j < C; j++)
      if (arr[i][j] == 'O')
        res += R - i;

  return res;
}