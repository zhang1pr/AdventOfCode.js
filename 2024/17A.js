const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = [];
  let [[A], [B], [C], D, opcode] = readnum2d(input);

  let i = 0;
  while (i < opcode.length) {
    let op = opcode[i], sec = opcode[i + 1];

    let cb = sec;
    if (cb == 4) cb = A;
    else if (cb == 5) cb = B;
    else if (cb == 6) cb = C;

    if (op == 0)
      A = Math.floor(A / 2 ** cb);
    else if (op == 1)
      B = B ^ sec;
    else if (op == 2)
      B = cb % 8;
    else if (op == 3) {
      i = A != 0 ? sec : i + 2;
      continue;
    } else if (op == 4)
      B = B ^ C;
    else if (op == 5)
      res.push(cb % 8);
    else if (op == 6)
      B = Math.floor(A / 2 ** cb);
    else if (op == 7)
      C = Math.floor(A / 2 ** cb);

    i += 2;
  }

  return res.join(',');
}

console.log(solve(input));