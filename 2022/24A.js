const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['v', [1, 0]],['>', [0,1]],['^', [-1, 0]],['<', [0,-1]]]);
const darr = [[0, 0], [0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r,c,R,C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), t = 0;
  let ori = readword(input);
  let arr = ori.map(a=>a.split('').map(a=>[a]));

  let q = [[0,1]], R=arr.length, C=arr[0].length;

  while (true) {
    t++;

    let narr = arr.map(row=>row.map(a=>[]));

    for (let r=0; r<R; r++) 
      for (let c=0; c<C; c++) {
        if (ori[r][c] == '#') continue;

        for (let item of arr[r][c]) {
          if (item == '.') {
            continue;
          }

          let [dr,dc] = dmap.get(item);
          let nr=r+dr,nc=c+dc;

          if (ori[nr][nc] == '#') {
            nr = (nr+2*dr+R) % R;
            nc = (nc+2*dc+C) % C;
          }

          narr[nr][nc].push(item);
        }
      }

    arr = narr;
    let nq = [];

    for (let [r,c] of q) {
      for (let [dr,dc] of darr) {
        let nr=r+dr,nc=c+dc;

        if (!isIn(nr,nc,R,C) || ori[nr][nc] == '#' || arr[nr][nc].length != 0)
          continue;

        if (nr == R-1 && nc == C-2)
          return t;

        let str = nr+','+nc;
        if (!map.has(str) || map.get(str) < t) {
          map.set(str, (map.get(str) || 0) + 1);
          nq.push([nr,nc]);  
        }
      }
    }

    q = nq;
  }
}