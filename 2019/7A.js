const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = input.split(',').map(a => +a);

  for (let x = 1234; x <= 43210; x++) {
    let str = x.toString().padStart(5, '0');

    if (new Set(str).size != 5)
      continue;

    let output = 0;

    for (let ch of str)
      if (ch > '4')
        output = -1;

    if (output == -1) continue;

    for (let ch of str)
      output = intcode(arr.slice(), [+ch, output]);


    res = Math.max(res, output);
  }

  return res;
}

function intcode(arr, input) {
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
      arr[a] = input.shift();
      idx += 2;
    } else if (op == 4) {
      return valA;
    } else if (op == 5) {
      idx = valA != 0 ? valB : idx + 3;
    } else if (op == 6) {
      idx = valA == 0 ? valB : idx + 3;
    } else if (op == 7) {
      arr[c] = valA < valB ? 1 : 0;
      idx += 4;
    } else if (op == 8) {
      arr[c] = valA == valB ? 1 : 0;
      idx += 4;
    }
  }
}

console.log(solve(input));