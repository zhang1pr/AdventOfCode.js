const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['v', [1, 0]],['>', [0,1]]]);
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let t = 0;
  let arr = readword(input).map(a=>a.split(''));

  while (true) {
    t++;
    narr = arr.map(a=>a.slice());

    let f = true;
    for (let i=0;i<arr.length;i++) {
      let row = arr[i];
  
      for (let j=0;j<row.length;j++) {
        let val = arr[i][j];

        if (val == '>') {
          let [di,dj] = dmap.get(val);
          let ni=i+di,nj=j+dj;

          if (ni == arr.length) ni = 0;
          if (nj == row.length) nj = 0;
          
          if (arr[ni][nj] == '.') {
            f = false;
            narr[ni][nj] = val;
						narr[i][j] = '.';
          }
        }
      }
    }

    nnarr = narr.map(a=>a.slice());

    for (let i=0;i<arr.length;i++) {
      let row = narr[i];
  
      for (let j=0;j<row.length;j++) {
        let val = narr[i][j];

        if (val == 'v') {
          let [di,dj] = dmap.get(val);
          let ni=i+di,nj=j+dj;

          if (ni == arr.length) ni = 0;
          if (nj == row.length) nj = 0;
          if (narr[ni][nj] == '.') {
            f = false;
            nnarr[ni][nj] = val;
						nnarr[i][j] = '.';
          }
        }
      }
    }
  
    if (f) break;
    arr = nnarr;
  }
  
  return t;
}
