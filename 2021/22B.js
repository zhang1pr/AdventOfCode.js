const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0;
  let arr = readword(input);
  arr = arr.map(a => {
    let res = a.split(' '); 

    res[0] = res[0] == 'on'

    res[1] = res[1].split(',');
    let cur = [];
    for (let a of res[1]) {
      let arr = a.slice(2).split('..').map(a=>+a);
      arr[1]++;
      cur.push(...arr)
    }
    res = [...cur, res[0]];
    return res;
  }); 

  let carr = [];
  for (let cube of arr) {
    let [x1,x2,y1,y2,z1,z2] = cube;
    let narr = [];
    
    for (let item of carr) {
      let cur;
      let [xx1,xx2,yy1,yy2,zz1,zz2,ff] = item;

      let cnt = 0;
      if (x2 > xx1 && x1 < xx2) cnt++;
      if (y2 > yy1 && y1 < yy2) cnt++;
      if (z2 > zz1 && z1 < zz2) cnt++;
      
      if (cnt < 3) {
        narr.push(item); 
      } else {
        if (xx1 < x1) {
          cur = [xx1,x1,yy1,yy2,zz1,zz2,ff];
          xx1 = x1;
          narr.push(cur);
        } 
        
        if (xx2 > x2) {
          cur = [x2,xx2,yy1,yy2,zz1,zz2,ff];
          xx2 = x2;
          narr.push(cur);
        }
        
        if (yy1 < y1) {
          cur = [xx1,xx2,yy1,y1,zz1,zz2,ff];
          yy1 = y1;
          narr.push(cur);
        }
      
        if (yy2 > y2) {
          cur = [xx1,xx2,y2,yy2,zz1,zz2,ff];
          yy2 = y2;
          narr.push(cur);
        }
 
        if (zz1 < z1) {
          cur = [xx1,xx2,yy1,yy2,zz1,z1,ff];
          zz1 = z1;
          narr.push(cur);   
        }
              
        if (zz2 > z2) {;
          cur = [xx1,xx2,yy1,yy2,z2,zz2,ff];
          zz2 = z2;
          narr.push(cur);
        }
      }
    }

    narr.push(cube);
    carr = narr;
  }
  
  for (let [x1,x2, y1,y2, z1,z2,f] of carr) {
    if (f) {
      res += (x2-x1) * (y2-y1) * (z2-z1);
    }
  }

  return res;
}

console.log(B(input));
