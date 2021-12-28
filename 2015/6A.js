const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), res = 0;
  let arr = readword(input).map(a => {
    let cur = a.split(' ');
    let len = cur.length;
    let lcorner = cur[len-3].split(',').map(a=>+a);
    let rcorner = cur[len-1].split(',').map(a=>+a);

    return [cur.slice(0, len-3).join(' '), ...lcorner, ...rcorner];
  });

  for (let [ins, x1, y1, x2, y2] of arr) {
    for (let x=x1; x<=x2; x++) {
      for (let y=y1; y<=y2; y++) {
        let str = x + ',' + y;
        let val = map.get(str);
        
        if (ins == 'turn on') {
          val = true;
        } else if (ins == 'turn off') {
          val = false;
        } else if (ins == 'toggle') {
          val = !val;
        }

        map.set(str, val);
      }
    }
  }

  for (let [k,v] of map) {
    if (v) res++;
  }

  return res;
}
