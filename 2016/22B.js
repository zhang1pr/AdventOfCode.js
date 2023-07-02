const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r,c,R,C) => 0 <= r && r < R && 0 <= c && c < C; 
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let set = new Set(), t = 0;
  let arr = readword(input).filter(a=>a.startsWith('/'));
  let xstart=ystart=xend=yend=0, midx, midy;
  let X=0,Y=0;

  for (let str of arr) {  
    let [x1,y1,size1,used1,avail1,use1] = readnum(str);
    X = Math.max(X,x1), Y=Math.max(Y,y1);
    
    if (y1 == 0)
      xstart = Math.max(xstart, x1);

    if (used1 == 0) {
      midx=x1;
      midy=y1;
    }

    if (used1 > 100)
      set.add(x1+','+y1);
  }

  let q = [[midx, midy]];
  let found = false;

  while (!found) {
    t++;
    let nq = [];

    for (let [x,y] of q) {
      for (let [dx, dy] of darr) {
        let nx=x+dx,ny=y+dy;

        if (isIn(nx,ny,X+1,Y+1) && !set.has(nx+','+ny)) {
          set.add(nx+','+ny);
          if (ny == 0 && nx == X)
            found = true;
          else
            nq.push([nx,ny]);
        } 
      }  
    }

    q = nq;
  }

  return t + (xstart - 1) * 5;
}
