const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readnum2d(input);

  for (let i = 0; i < arr.length; i+=4) {
    if (!arr[i].length) break;

    let before = arr[i], [op, A, B, C] = arr[i+1], after = arr[i+2];
    let r = after[C];

    let cand = []; 
    cand.push(before[A] + B, before[A] + before[B]);
    cand.push(before[A] * B, before[A] * before[B]);
    cand.push(before[A] & B, before[A] & before[B]);
    cand.push(before[A] | B, before[A] | before[B]);
    cand.push(A, before[A]);
    cand.push(A > before[B] ? 1 : 0, before[A] > B ? 1 : 0, before[A] > before[B] ? 1 : 0);
    cand.push(A == before[B] ? 1 : 0, before[A] == B ? 1 : 0, before[A] == before[B] ? 1 : 0);

    if (cand.filter(a => a == r).length >= 3) res++;    
  }

  return res;
}
