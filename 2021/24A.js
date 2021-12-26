const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map();
  let arr = readword(input); 
  
  let X = [], Y = [], Z = [];

  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i];

    if (cur.startsWith('add x') && !cur.startsWith('add x z')) {
      X.push(+cur.split(' ')[2]);
    } else if (cur.startsWith('div z')) {
      Z.push(+cur.split(' ')[2]);
    } else if (cur.startsWith('add y') && i % 18 == 15) {
      Y.push(+cur.split(' ')[2]);
    }
  }

  function calc(idx, z, w) {
    let x = X[idx] + (z % 26);
    z = Math.floor(z / Z[idx]);

    if (x != w) {
      z = z * 26 + w + Y[idx];
    }

    return z;
  }

  let zmax = Z.slice().fill(1);

  for (let i=Z.length-1;i>=0;i--) {
    if (i < Z.length-1) zmax[i] = zmax[i+1];
    
    zmax[i] *= Z[i];
  }

  let can = [...Array(9)].map((a, idx) => idx+1);

  function dfs(idx, z) {
    let str = [...arguments].join(',');
    if (map.has(str)) return map.get(str);

    if (idx == 14) {
      if (z == 0) return ['']; else return [];
    }
   
    if (z > zmax[idx]) {
      return [];
    }

    let nx = X[idx] + z % 26;    
    let nw = can;
    
    if (nx >= 1 && nx <= 9) nw = [nx]
    
    let res = []
    for (let w of nw) {
      let znext = calc(idx, z, w)
      let arr = dfs(idx + 1, znext)

      for (let x of arr)
        res.push(w.toString() + x);
    }

    map.set(str, res);

    return res;
  }

  return Math.max(...dfs(0, 0).map(a=>+a));
}
