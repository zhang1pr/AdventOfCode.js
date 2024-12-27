const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => BigInt(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0n;
  let arr = readnum(input);
  let M = 16777216n;

  let T = 2000;
  let calc = (a, b) => (a ^ b) % M;

  for (let x of arr) {
    let secret = new Map();
    let arr = [], d = [];

    for (let i = 0; i < T; i++) {
      x = calc(x, x * 64n);
      x = calc(x, x / 32n);
      x = calc(x, x * 2048n);
      arr.push(Number(x % 10n));
    }

    for (let i = 0; i < T - 1; i++)
      d.push(arr[i] - arr[i + 1]);

    for (let i = 0; i < T - 4; i++) {
      let key = d.slice(i, i + 4).join('');

      if (!secret.has(key))
        secret.set(key, arr[i + 4]);
    }

    for (let [k, v] of secret)
      map.set(k, (map.get(k) || 0) + v);
  }

  return Math.max(...map.values());
}

console.log(solve(input));