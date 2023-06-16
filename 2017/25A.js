const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let stateMap = new Map(), insMap = new Map(), res = 0;
  let arr = readword(input);

  let cur = arr[0].at(-2);
  let steps = +arr[1].match(/\d+/);
  let idx = 0;

  for (let i = 3; i < arr.length; i+=10) {
    let stateName = arr[i].at(-2);
    let ins = [];

    let write = +arr[i+2].at(-2);
    let shift;
    if (arr[i+3].endsWith('right.')) shift = 1;
    else shift = -1;
    let next = arr[i+4].at(-2);

    ins.push([write,shift,next]);

    write = +arr[i+6].at(-2);
    if (arr[i+7].endsWith('right.')) shift = 1;
    else shift = -1;
    next = arr[i+8].at(-2);

    ins.push([write,shift,next]);
    insMap.set(stateName, ins);
  }

  for (let i=0; i<steps; i++) {
    let curVal = stateMap.get(idx) || 0;
    let [write,shift,next] = insMap.get(cur)[curVal];

    stateMap.set(idx, write);
    idx += shift;
    cur = next;
  }

  for (let [k,v] of stateMap)
    if (v == 1)
      res++;

  return res;
}