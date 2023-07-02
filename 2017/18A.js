const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), res = 0;
  let arr = readword2d(input);
  
  function getVal(x) {
    if (map.has(x))
      return map.get(x);

    if (x == +x)
      return +x;

    return 0;
  }

  let i=0;
  while (i<arr.length) {
    let [ins,x,y] = arr[i];
    let valx = getVal(x);
    let valy = getVal(y);
      
    if (ins == 'snd') {
      res = valx;
    } else if (ins == 'set') {
      valx = valy;
    } else if (ins == 'add') {
      valx += valy;
    } else if (ins == 'mul') {
      valx *= valy;
    } else if (ins == 'mod') {
      valx %= valy;
    } else if (ins == 'rcv') {
      if (valx != 0) 
        break;
    } else if (ins == 'jgz') {
      if (valx > 0) {
        i += valy;
        continue;
      }
    }
    i++;
    map.set(x, valx);
  }

  return res;
}
