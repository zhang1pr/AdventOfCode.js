const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => BigInt(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = Infinity;
  let [[A], [B], [C], _, opcode] = readnum2d(input);

  function run(A, index) {
    let res = [];

    let i = 0;
    while (i < opcode.length) {
      let op = opcode[i], sec = opcode[i + 1];

      let cb = sec;
      if (cb == 4n) cb = A;
      else if (cb == 5n) cb = B;
      else if (cb == 6n) cb = C;

      if (op == 0n)
        A = A / 2n ** cb;
      else if (op == 1n)
        B = B ^ sec;
      else if (op == 2n)
        B = cb % 8n;
      else if (op == 3n) {
        i = A != 0n ? Number(sec) : i + 2;
        continue;
      } else if (op == 4n)
        B = B ^ C;
      else if (op == 5n) {
        return cb % 8n;
      } else if (op == 6n)
        B = A / 2n ** cb;
      else if (op == 7n)
        C = A / 2n ** cb;

      i += 2;
    }
  }

  function DFS(score, index) {
    if (index == 16) {
      res = Math.min(res, Number(score));
      return;
    }

    for (let i = 0n; i < 8n; i += 1n)
      if (run(i + 8n * score) == opcode[15 - index])
        DFS(i + 8n * score, index + 1);
  };

  DFS(0n, 0);

  return res;
}

console.log(solve(input));