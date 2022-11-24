const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['U', [-1, 0]],['D', [1, 0]],['L', [0, -1]],['R', [0, 1]]]);
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = '';
  let arr = readword(input);
  let r=c=1;

  for (let str of arr) {    
    for (let ch of str) {
      let [dr, dc] = dmap.get(ch);
      
      if (0<=r+dr&& r+dr<3 && 0<=c+dc && c+dc<3) {
        r = r+dr;
        c = c+dc;
      }
    }

    let cur = r * 3 + c + 1;
    res += cur;
  }

  return res;
}
