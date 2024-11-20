const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), stateMap = new Map(), periodMap = new Map(), res = 0, t = 0;
  let arr = readword(input);
  let state = [...arr[0].split(' ').at(-1)];

  for (let i = 2; i < arr.length; i++) {
    let [k, v] = arr[i].split(' => ');
    map.set(k, v);
  }

  let lastTime, negative = 0, cnt = 0;
  while (true) {
    while (state.at(-1) == '.') state.pop();
    while (state[0] == '.') {
      state.shift();
      negative--;
    }

    let str = state.join('');

    if (!stateMap.has(str))
      stateMap.set(str, t).set(t, negative);
    else {
      if (!lastTime)
        lastTime = stateMap.get(str);

      if (!periodMap.has(str)) {
        periodMap.set(str, cnt).set(cnt, str);
        cnt++;
      } else {
        break;
      }
    }

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

  let oldNegative = stateMap.get(lastTime);
  let period = periodMap.size / 2;
  let diff = (negative - oldNegative) / (t - lastTime);

  let finalNegative = (50000000000 - lastTime) / diff + oldNegative;
  let finalState = periodMap.get((50000000000 - lastTime) % period);

  for (let i = 0; i < finalState.length; i++)
    if (state[i] == '#')
      res += i - finalNegative;

  return res;
}

console.log(solve(input));