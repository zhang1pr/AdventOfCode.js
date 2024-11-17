const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum(input);
  let LEN = arr.length;
  let set = new Set().add(arr.join(','));

  while (true) {
    res++;

    let max = Math.max(...arr);
    let idx = arr.indexOf(max);
    let mod = max % LEN;
    let share = (max - mod) / LEN;
    arr[idx] = 0;

    for (let i = 0; i < LEN; i++) {
      if (mod) {
        arr[(i + 1 + idx) % LEN] += share + 1;
        mod--;
      } else {
        arr[(i + 1 + idx) % LEN] += share;
      }
    }

    let state = arr.join(',');
    if (set.has(state)) break;
    set.add(state);
  }

  return res;
}