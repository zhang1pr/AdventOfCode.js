const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map();
  let set = new Set();
  
  let res = 0;
  let strs = readword(input);
  let num = strs[0].split(',');
  let arr = [];
  for (let i=1; i<strs.length; i++) {
    if (strs[i]) {
      arr.push(strs[i].trim().split(/\s+/));
    }
  }

  let row = [];
  let id = -1;
  let board = [];
  for (let i=0;i<arr.length;i+=5) {
    id++;
    let mat = arr.slice(i,i+5);
    board.push(mat);

    for (let i=0;i<mat.length;i++) {
      row.push(mat[i]);
      map.set(mat[i].join(','), id);
      let col = [];

      for (let c=0;c<5;c++) {
        col.push(mat[c][i]);
      }

      row.push(col);
      map.set(col.join(','), id);
    }
  }

  let winset = new Set();
  for (const cnum of num) {
    set.add(cnum);

    for (let a of row) {
      let bid = map.get(a.join(','));

      if (winset.has(bid)) continue;

      if (a.every(b => set.has(b))) {
        winset.add(bid);
        let cur = board[map.get(a.join(','))];
        let sum = 0;
       
        for (let r of cur) {
          for (let v of r) {
            if (!set.has(v)) {
              sum += (+v);
            }
          }
        }
        
        res = cnum * sum;
      }
    }
  }

  return res;
}
