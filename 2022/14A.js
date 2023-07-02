const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let set = new Set(), res = 0;
  let arr = readnum2d(input);
  let my=0, mxl=Infinity, mxr=-Infinity;

  for (let row of arr) {
    for (let j=2; j+1<row.length; j+=2) {
      let [a,b] = [row[j-2],row[j-1]], [c,d] = [row[j],row[j+1]];
      my = Math.max(my,b,d);
      mxl = Math.min(mxl,a,c);
      mxr = Math.max(mxr,a,c);
      
      if (a == c) {
        let min = Math.min(b,d), max = Math.max(b,d);
        for (let k=min;k<=max;k++)
          set.add(k+','+a);
      } else {
        let min = Math.min(a,c), max = Math.max(a,c);
        for (let k=min;k<=max;k++)
          set.add(b+','+k);
      }
    }
  }

  let darr = [[1, 0], [1, -1], [1, 1]];

  while (true) {
    let r=0, c=500;
    let lastr=r, lastc=c;
    let isFinal = true;
    
    while (mxl <= c && c <= mxr && r <= my) {
      for (let [dr,dc] of darr) {
        let nr=r+dr,nc=c+dc;
        let s=nr+','+nc;

        if (!set.has(s)) {
          r = nr, c = nc;
          break;
        }
      }
      
      if (r == lastr && c == lastc) {
        if (!set.has(r+','+c)) {
          res++;
          isFinal = false;
          set.add(r+','+c);
        }
        
        break;
      }
      
      lastr=r, lastc=c;
    }

    if (isFinal) break;
  }

  return res;
}
