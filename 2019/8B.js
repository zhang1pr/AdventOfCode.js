const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let H = 6, W = 25;
  let arr = [...Array(H)].map(() => Array(W).fill(null));
  let ch = [' ', '#'];

  for (let i = 0; i < input.length; i += W * H) {
    let str = input.slice(i, i + W * H);

    for (let j = 0; j < str.length; j++) {
      let r = Math.floor(j / W), c = j % W;

      if (str[j] == '2') continue;
      if (arr[r][c] == null)
        arr[r][c] = ch[str[j]];
    }
  }

  return arr.map(a => a.join('')).join('\n');
}

console.log(solve(input));