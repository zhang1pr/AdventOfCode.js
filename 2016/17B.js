const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['U', [-1, 0]],['D', [1, 0]],['L', [0, -1]],['R', [0, 1]]]);
const dstr = 'UDLR';
const isIn = (r,c,R,C) => 0 <= r && r < R && 0 <= c && c < C; 
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));
const crypto = require('crypto');

function B(input) {
  let t = 0;
  let q = [[0,0,'']];
  let res;

  while (q.length) {
    t++;
    let nq = [];
    
    for (let [r,c,path] of q) {
      let str = input + path;
      let hash = crypto.createHash('md5').update(str).digest('hex');

      for (let [dir, [dr,dc]] of dmap) {
        let nr = r + dr, nc = c + dc;
        let ch = hash[dstr.indexOf(dir)];
        let npath = path + dir;

        if (isIn(nr,nc,4,4) && 'b' <= ch && ch <= 'f') {
          if (nr == 3 && nc == 3) 
            res = t;
          else
            nq.push([nr,nc,npath]);
        }
      }
    }

    q = nq;
  }

  return res;
}

console.log(B(input));
