const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);
  let A = arr[0][0], B = arr[1][0];
  let mulA = 16807, mulB = 48271, MOD = 2147483647;

  for (let i = 0; i < 5000000; i++) {
    do A = (A * mulA) % MOD;
    while (A % 4 != 0);

    do B = (B * mulB) % MOD;
    while (B % 8 != 0);

    let hashA = A.toString(2), hashB = B.toString(2);

    if (hashA.slice(hashA.length - 16).padStart(16, '0') == hashB.slice(hashB.length - 16).padStart(16, '0'))
      res++;
  }

  return res;
}

console.log(solve(input));