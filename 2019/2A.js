const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = input.split(',').map(a => +a);
  let idx = 0;
  arr[1] = 12, arr[2] = 2;

  while (true) {
    let [op, a, b, c] = arr.slice(idx, idx + 4);
    let val;

    if (op == 99) {
      break;
    } else if (op == 1) {
      val = arr[a] + arr[b];
    } else if (op == 2) {
      val = arr[a] * arr[b];
    }

    arr[c] = val;
    idx += 4;
  }

  return arr[0];
}

console.log(solve(input));