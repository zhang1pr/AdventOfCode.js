const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0, t = 0;
  let arr = readword(input);
  let state = [...arr[0].split(' ').at(-1)];

  for (let i = 2; i < arr.length; i++) {
    let [k, v] = arr[i].split(' => ');
    map.set(k, v);
  }

  let negative = 0;
  while (t < 20) {
    t++;

    for (let i = 0; i < 4; i++) {
      state.unshift('.');
      state.push('.');
    }

    negative += 2;

    let arr = [];
    for (let i = 0; i < 5; i++)
      arr.push(state[i]);

    let nstate = [map.get(arr.join('')) || '.'];

    for (let i = 5; i < state.length; i++) {
      arr.shift();
      arr.push(state[i]);
      nstate.push(map.get(arr.join('')) || '.');
    }

    state = nstate;
  }

  for (let i = 0; i < state.length; i++)
    if (state[i] == '#')
      res += i - negative;

  return res;
}