const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  return intcode(input.split(',').map(a => +a));
}

function intcode(arr) {
  let idx = arr.idx || 0;
  let re = arr.re || 0;

  while (true) {
    let [code, a, b, c] = arr.slice(idx, idx + 4);

    let op = code % 100;
    code = (code - op) / 100;
    let modeA = code % 10;
    code = (code - modeA) / 10;
    let modeB = code % 10;
    code = (code - modeB) / 10;
    let modeC = code % 10;

    if (modeA == 2) a += re;
    if (modeB == 2) b += re;
    if (modeC == 2) c += re;

    let valA = modeA == 1 ? a : arr[a];
    let valB = modeB == 1 ? b : arr[b];
    valA = valA || 0;
    valB = valB || 0;

    if (op == 99) {
      arr.idx = idx;
      arr.re = re;

      break;
    } else if (op == 1) {
      arr[c] = valA + valB;
      idx += 4;
    } else if (op == 2) {
      arr[c] = valA * valB;
      idx += 4;
    } else if (op == 3) {
      arr[a] = 2;
      idx += 2;
    } else if (op == 4) {
      idx += 2;
      arr.idx = idx;
      arr.re = re;

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
    } else if (op == 9) {
      re += valA;
      idx += 2;
    }
  }
}

console.log(solve(input));