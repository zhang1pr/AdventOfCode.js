const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword2d(input);

  let start, max, interval, vd;

  for (let i = 0; i < arr.length; i++) {
    let [ins, a, b] = arr[i];

    if (ins == 'set' && a == 'b') start = +b;
    if (ins == 'mul' && a == 'b') start *= +b;
    if (ins == 'sub' && a == 'b') start += -b;
    if (ins == 'sub' && a == 'c') max = -b;
    if (ins == 'sub' && a == 'b') interval = -b;
    if (ins == 'set' && a == 'd') vd = +b;
  }

  for (let cur = start; cur <= start + max; cur += interval) {
    let d = vd;

    while (cur % d != 0) d++;

    if (cur !== d) res++;
  }

  return res;
}