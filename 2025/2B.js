const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = input.split(',').map(a => a.split('-').map(a => +a));

  for (let [a, b] of arr) {
    for (let cur = a; cur <= b; cur++) {
      let d = Math.floor(Math.log10(cur)) + 1;

      for (let i = 2; i <= d; i++) {
        if (d % i == 0) {
          let set = new Set();
          let cnt = i, num = cur;

          while (cnt--) {
            let unit = 10 ** (d / i);
            let mod = num % unit;
            set.add(mod);

            if (set.size > 1) break;
            num = (num - mod) / unit;
          }

          if (set.size == 1) {
            res += cur;
            break;
          }
        }
      }
    }
  }

  return res;
}

console.log(solve(input));