const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['U', [-1, 0]],['D', [1, 0]],['L', [0, -1]],['R', [0, 1]]]);
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = '';
  let arr = readword(input);
  let r=0, c=-2;
  let row = [1,3,7,11,13];

  for (let str of arr) {    
    for (let ch of str) {
      let [dr, dc] = dmap.get(ch);
      
      if (Math.abs(r+dr) + Math.abs(c+dc) <= 2) {
        r = r+dr;
        c = c+dc;
      }
    }

    let cur = (row[r+2] + c).toString(16).toUpperCase();
    res += cur;
  }

  return res;
}
