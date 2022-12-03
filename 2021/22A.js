const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/-?\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let set = new Set();
  let arr = readword(input).map(a => {
    let res = a.split(' '); 

    res[0] = res[0] == 'on';

    res[1] = res[1].split(',');
    let cur = [];
    for (let a of res[1]) {
      let arr = a.slice(2).split('..').map(a=>+a);
      cur.push(...arr)
    }

    return [...cur, res[0]];
  }); 

  for (let [x1,x2,y1,y2,z1,z2,f] of arr)
    for (let x=Math.max(-50,x1);x<=Math.min(50,x2);x++) 
      for (let y=Math.max(-50,y1);y<=Math.min(50,y2);y++) 
        for (let z=Math.max(-50,z1);z<=Math.min(50,z2);z++)
          if (f) 
            set.add([x,y,z].join(',')); 
          else 
            set.delete([x,y,z].join(','));
  
  return set.size;
}
