const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0, total = 100;
  let arr = readnum2d(input);

  function calc(a,b,c,d) {
    let cur = Array(5).fill(0);
    let multi = [a,b,c,d];

    for (let i=0; i<arr.length; i++) {
      let row = arr[i];

      for (let j=0; j<row.length; j++) {
        cur[j] += row[j] * multi[i];
      }
    }     
   
    if (cur[4] != 500) return 0;
    cur[4] = 1;

    return cur.reduce((a,b) => {
      return b <= 0 ? 0 : a * b;
    }, 1);
  }

  for (let a=0; a<=total; a++) {
    for (let b=0; b<=total-a;b++) {
      for (let c=0; c<=total-a-b;c++) {
        res = Math.max(res, calc(a,b,c,total-a-b-c));
      }
    }
  }

  return res;
}