const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['N', [1, 0]],['S', [-1, 0]],['W', [0, -1]],['E', [0, 1]],[1, 0]]);const dstr = 'NESW';
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let set = new Set().add('0,0');
  let arr = input.split(', ');
  let idx = r = c = 0;

  for (let item of arr) {
    let dir = item[0], num = item.slice(1);
    dir = dir == 'L' ? -1 : 1;
    idx = (idx + dir + 4) % 4;
    let [dr,dc] = dmap.get(dstr[idx]);
    nr = r + num*dr;
    nc = c + num*dc;
    
    if (nc == c) {
      let diff = r > nr ? -1 : 1;
      for (let rr=r+diff; rr != nr + diff; rr += diff)  {
        if (set.has(rr+','+c)) {
          return Math.abs(rr) + Math.abs(c);
        }
        set.add(rr+','+c);
      }

      r = nr;
    } else {
      let diff = c > nc ? -1 : 1;
      for (let cc=c+diff; cc != nc + diff; cc += diff)  {

        if (set.has(r+','+cc)) {
          return Math.abs(r) + Math.abs(cc);
        }
        set.add(r+','+cc);
      }

      c = nc;
    }
  }
}
