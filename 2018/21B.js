const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set();
  let [ip, ...arr] = readword2d(input);
  let cur = ip[1], pointer = 0;
  let reg = Array(6).fill(0);
  let last = 0;

  while (pointer >= 0 && pointer < arr.length) {
    let [ins, a, b, c] = arr[pointer];
    a = +a, b = +b, c = +c;
    reg[cur] = pointer;

    if (ins == 'addr') {
      reg[c] = reg[a] + reg[b];
    } else if (ins == 'addi') {
      reg[c] = reg[a] + b;
    } else if (ins == 'mulr') {
      reg[c] = reg[a] * reg[b];
    } else if (ins == 'muli') {
      reg[c] = reg[a] * b;
    } else if (ins == 'banr') {
      reg[c] = reg[a] & reg[b];
    } else if (ins == 'bani') {
      reg[c] = reg[a] & b;
    } else if (ins == 'borr') {
      reg[c] = reg[a] | b;
    } else if (ins == 'bori') {
      reg[c] = reg[a] | b;
    } else if (ins == 'setr') {
      reg[c] = reg[a];
    } else if (ins == 'seti') {
      reg[c] = a;
    } else if (ins == 'gtir') {
      reg[c] = a > reg[b] ? 1 : 0;
    } else if (ins == 'gtri') {
      reg[c] = reg[a] > b ? 1 : 0;
    } else if (ins == 'gtrr') {
      reg[c] = reg[a] > reg[b] ? 1 : 0;
    } else if (ins == 'eqir') {
      reg[c] = a == reg[b] ? 1 : 0;
    } else if (ins == 'eqri') {
      reg[c] = reg[a] == b ? 1 : 0;
    } else if (ins == 'eqrr') {
      reg[c] = reg[a] == reg[b] ? 1 : 0;
    }

    pointer = reg[cur] + 1;

    if (ins == 'eqrr' && (a == 0 || b == 0)) {
      let val = reg[a] + reg[b];

      if (set.has(val)) return last;
      set.add(val);
      last = val;
    }
  }
}

console.log(solve(input));