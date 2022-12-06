const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map();

  let res = 0;
  let arr = readword(input);
  arr = arr.map(a => a.split(' -> '));
  
  for (let i=0;i<arr.length;i++) {
    let [a,b] = arr[i];
    [c,d] = a.split(',').map(a=>+a);
    [e,f] = b.split(',').map(a=>+a);

    if (c == e) {
      let min = Math.min(d,f), max = Math.max(d,f);

      for (let i=min;i<=max;i++) {
        let str = c+','+i; 
        map.set(str, (map.get(str) || 0)+1);
      }
    } else if (d == f) {
      let min = Math.min(c,e), max = Math.max(c,e);

      for (let i=min;i<=max;i++) {
        let str = i+','+d; 
        map.set(str, (map.get(str) || 0)+1);
      }
    }
  }

  for (let v of map.values()) {
    if (v > 1) res++;
  }

  return res;
}
