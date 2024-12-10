const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = input.split(',').map(a => +a);
  let idx = 0;

  while (true) {
    let [code, a, b, c] = arr.slice(idx, idx + 4);

    let op = code % 100;
    code = (code - op) / 100;
    let modeA = code % 10;
    code = (code - modeA) / 10;
    let modeB = code % 10;

    let valA = modeA == 1 ? a : arr[a];
    let valB = modeB == 1 ? b : arr[b];

    if (op == 99) {
      break;
    } else if (op == 1) {
      arr[c] = valA + valB;
      idx += 4;
    } else if (op == 2) {
      arr[c] = valA * valB;
      idx += 4;
    } else if (op == 3) {
      arr[a] = 1;
      idx += 2;
    } else if (op == 4) {
      if (valA != 0)
        return valA;

      idx += 2;
    }
  }
}

console.log(solve(input));