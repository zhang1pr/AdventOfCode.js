const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let R = 6, C = 50;
  let mat = [...Array(R)].map(() => Array(C).fill('.'));
  let arr = readword(input);

  for (let str of arr) {
    let [a, b] = str.match(/\d+/g).map(a => +a);

    if (str.slice(0, 4) == 'rect') {
      for (let i = 0; i < b; i++)
        for (let j = 0; j < a; j++)
          mat[i][j] = '#';
    } else {
      let nmat = mat.map(a => a.slice());

      if (str.includes('row'))
        for (let i = 0; i < C; i++)
          nmat[a][(i + b) % C] = mat[a][i];
      else
        for (let i = 0; i < R; i++)
          nmat[(i + b) % R][a] = mat[i][a];

      mat = nmat;
    }
  }

  return mat.map(a => a.join(''));
}

console.log(solve(input));