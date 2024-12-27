const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);

  for (let i = 0; i < arr.length; i += 4) {
    let [ax, ay] = arr[i], [bx, by] = arr[i + 1], [x, y] = arr[i + 2];

    let a = (x * by - y * bx) / (ax * by - ay * bx);
    let b = (x - a * ax) / bx;

    if (a == Math.floor(a) && b == Math.floor(b))
      res += a * 3 + b;
  }

  return res;
}

console.log(solve(input));