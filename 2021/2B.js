const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword2d(input);
  let a = 0, b = 0;

  for (let i = 0; i < arr.length; i++) {
    let [d, num] = arr[i];
    num = Number(num);

    if (d == 'up') a -= num;
    if (d == 'down') a += num;
    if (d == 'forward') b += num;
  }

  return a * b;
}

console.log(solve(input));