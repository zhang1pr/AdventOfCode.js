const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => BigInt(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0n;
  let arr = readnum(input);
  let M = 16777216n;

  let calc = (a, b) => (a ^ b) % M;

  for (let x of arr) {
    for (let i = 0; i < 2000; i++) {
      x = calc(x, x * 64n);
      x = calc(x, x / 32n);
      x = calc(x, x * 2048n);
    }

    res += x;
  }

  return Number(res);
}

console.log(solve(input));