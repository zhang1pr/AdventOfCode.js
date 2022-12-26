const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map0 = new Map().set('p',0), map1 = new Map().set('p',1), res = 0;
  let q0 = [], q1 = [];
  let arr = readword2d(input);

  do { 
    let vals1 = run(map0, q1.shift(), arr);
    let vals0 = run(map1, q0.shift(), arr);

    for (let x of vals1)
      q0.push(x);

    for (let x of vals0) {
      q1.push(x);
      res++;
    }
  } while (q0.length > 0 || q1.length > 0)

  return res;
}

function run(map, signal, arr) {
  let i = map.get('idx') || 0;
  let res = [];

  function getVal(x) {
    if (map.has(x))
      return map.get(x);

    if (x == +x)
      return +x;

    return 0;
  }

  while (i<arr.length) {
    let [ins,x,y] = arr[i];
    let valx = getVal(x);
    let valy = getVal(y);
      
    if (ins == 'snd') {
      res.push(valx);
    } else if (ins == 'set') {
      valx = valy;
    } else if (ins == 'add') {
      valx += valy;
    } else if (ins == 'mul') {
      valx *= valy;
    } else if (ins == 'mod') {
      valx %= valy;
    } else if (ins == 'rcv') {
      if (signal == null)
        break;

      valx = signal;
      signal = null;
    } else if (ins == 'jgz') {
      if (valx > 0) {
        i += valy;
        continue;
      }
    }

    i++;
    map.set(x, valx);
  }

  map.set('idx', i);
  return res;
}

console.log(B(input));
