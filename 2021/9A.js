const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readword(input).map(a => a.split('').map(a=>+a)); 

  for (let i=0;i<arr.length;i++) {
    let cur = arr[i];

    for (let j=0;j<cur.length;j++) {
      let flag = true;

      for (let [di,dj] of darr) {
        let ni = i+di, nj=j+dj;
        
        if (arr[ni] == null || arr[ni][nj] == null) continue;
      
        if (arr[ni][nj] <= cur[j]) flag = false;
      }

      if (flag) res = res + 1 + cur[j];
    }
  }

  return res;
}
