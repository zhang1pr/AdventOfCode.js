const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let cur = 1;
  let arr = readword2d(input);

  function transmit(val) {
    let map = new Map().set('a', val);
    let i = 0;
    let last = 1;
    let cnt = 64;

    while (cnt) {
      let [a,b,c] = arr[i];
      let vb = +b == b ? +b : map.get(b);
      let vc = +c == c ? +c : map.get(c);
  
      if (a == 'cpy') {
        if (+c != c)
          map.set(c, vb);
      } else if (a == 'inc') {
        if (+b != b)
          map.set(b, vb + 1);
      } else if (a == 'dec') {
        if (+b != b)
          map.set(b, vb - 1);
      } else if (a == 'jnz') {
        if (vb != 0) {
          i += vc;
          continue;
        }
      } else if (a == 'out') {
        if (last == vb)
          return false;
        else
          last = vb;
        
        cnt--;  
      }
      
      i++;
    }

    return true;
  }
  
  while (true) {
    if (transmit(cur)) 
      return cur;
    
    cur++;
  }
}
