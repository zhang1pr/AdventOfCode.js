const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readnum2d(input);
  let regs = [0, 0, 0, 0];
  let opFunction = [];
  opFunction.push((before, A, B) => before[A] + B);
  opFunction.push((before, A, B) => before[A] + before[B]);
  opFunction.push((before, A, B) => before[A] * B);
  opFunction.push((before, A, B) => before[A] * before[B]);
  opFunction.push((before, A, B) => before[A] & B);
  opFunction.push((before, A, B) => before[A] & before[B]);
  opFunction.push((before, A, B) => before[A] | B);
  opFunction.push((before, A, B) => before[A] | before[B]);
  opFunction.push((before, A) => A);
  opFunction.push((before, A) => before[A]);
  opFunction.push((before, A, B) => A > before[B] ? 1 : 0);
  opFunction.push((before, A, B) => before[A] > B ? 1 : 0);
  opFunction.push((before, A, B) => before[A] > before[B] ? 1 : 0);
  opFunction.push((before, A, B) => A == before[B] ? 1 : 0);
  opFunction.push((before, A, B) => before[A] == B ? 1 : 0);
  opFunction.push((before, A, B) => before[A] == before[B] ? 1 : 0);

  let cand = [...Array(16)].map(() => new Set([...Array(16)].map((a, idx) => idx)));

  let idx;
  for (let i = 0; i < arr.length; i += 4) {
    if (!arr[i].length) {
      idx = i;
      break;
    }

    let before = arr[i], [op, A, B, C] = arr[i + 1], after = arr[i + 2];

    let set = cand[op];

    for (let i = 0; i < opFunction.length; i++)
      if (opFunction[i](before, A, B) != after[C])
        set.delete(i);
  }

  let finalFunction = Array(16), set = new Set();
  while (set.size < finalFunction.length) {
    for (let i = 0; i < cand.length; i++) {
      let candSet = cand[i];

      for (let x of set)
        candSet.delete(x);

      if (candSet.size == 1) {
        set.add(...candSet);
        finalFunction[i] = opFunction[[...candSet][0]];
      }
    }
  }

  while (!arr[idx].length) idx++;

  for (let i = idx; i < arr.length; i++) {
    let [op, A, B, C] = arr[i];
    let f = finalFunction[op];
    regs[C] = f(regs, A, B);
  }

  return regs[0];
}

console.log(solve(input));