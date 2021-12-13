const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function a(input) {
  let set = new Set();
  let arr = readword(input);
  let insarr = arr.filter(a => a[0] == 'f').map(a => a.split(' ')[2]).map(a => a.split('='));
  arr = arr.filter(a => a[0] != 'f' && a);

  for (let ins of insarr) {
    set = new Set();

    let [fold, num] = ins;
    num = +num;
  
    let nc, nr, r, c;
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
    
    c = nc, r = nr;
    arr = [...set];
    break;
  }

  return set.size;
}
