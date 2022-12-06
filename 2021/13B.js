const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let set = new Set(), res;
  let arr = readword(input);
  let insarr = arr.filter(a => a[0] == 'f').map(a => a.split(' ')[2]).map(a => a.split('='));
  arr = arr.filter(a => a[0] != 'f' && a);
  let r,c;

  for (let ins of insarr) {
    set = new Set();

    let [fold, num] = ins;
    num = +num;
  
    let nc, nr;
    if (fold == 'y') {
      nr = num;
      r = num * 2;
    } else {
      nc = num;
      c = num * 2;
    }
    
    for (let p of arr) {
      let [i, j] = p.split(',').map(a=>+a);
     
      if (nr != r && j >= nr && j <= r) { 
        set.add(i + ',' + (r-j));
      } else if (nc != c && i >= nc && i <= c) {
        set.add((c-i) + ',' + j);
      } else {
        set.add(i + ',' + j);        
      }
    } 
    
    c = nc ? nc : c, r = nr ? nr: r;
    arr = [...set];
  }

  res = [...Array(r+1)].map(() => Array(c+1).fill(' '));

  for (let p of set) {
    let [i, j] = p.split(',');
    res[j][i] = '■';
  }

  res = res.map(a => a.join(''));

  return res;
}
