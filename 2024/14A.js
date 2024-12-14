const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readnum2d(input);
  let W = 101, H = 103;
  let halfw = Math.floor(W / 2), halfh = Math.floor(H / 2);

  let MOD = (x, mod) => (x % mod + mod) % mod;
  let A = [0, 0, 0, 0];

  for (let [px, py, vx, vy] of arr) {
    let x = MOD(px + 100 * vx, W), y = MOD(py + 100 * vy, H);

    if (x < halfw && y < halfh) A[0]++;
    if (x < halfw && y > halfh) A[1]++;
    if (x > halfw && y < halfh) A[2]++;
    if (x > halfw && y > halfh) A[3]++;
  }

  return A.reduce((a, b) => a * b);
}

console.log(solve(input));