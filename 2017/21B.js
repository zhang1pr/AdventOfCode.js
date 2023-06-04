const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const count = (t, p) => (t.match(new RegExp(p, 'g')) || []).length;
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map();
  let arr = readword(input).map(a => a.split(' => '));
  let pattern = '.#./..#/###';

  for (let [a,b] of arr) {
    let cur = a.split('/');
    let flip = a.split('/').reverse();
    let cand = [];

    for (let i=0; i<=3; i++) {
      cand.push(cur.join('/'));
      cand.push(flip.join('/'));
      cur = rotate(cur);
      flip = rotate(flip);
    }

    for (let x of cand)
      map.set(x, b);
  }

  let cur = 3;
  for (let i=1; i<=18; i++)
    if (cur % 2 == 0) {
      pattern = transform(map, pattern, 2, 3/2);
      cur *= 3/2;
    } else {
      pattern = transform(map, pattern, 3, 4/3);
      cur *= 4/3;  
    }

  return count(pattern, '#');
}

function rotate(arr) {
  let len = arr.length;
  let narr = arr.map(a=>a.slice().split());
  for (let i=0; i<len; i++)
    for (let j=0; j<len; j++)
      narr[j][len-1-i] = arr[i][j];

  return narr.map(a=>a.join(''));    
}

function transform(map, pattern, unit, ratio) {
  let arr = pattern.split('/');
  let size = arr.length;
  let nsize = size * ratio;
  let nunit = unit * ratio;
  let narr = [...Array(nsize)].map(() => Array(size));

  for (let i=0; i<size/unit; i++)
    for (let j=0; j<size/unit; j++) {
      let str = '';

      for (let r=i*unit; r<i*unit+unit; r++) {
        for (let c=j*unit; c<j*unit+unit; c++)
          str += arr[r][c];
        
        if (r < i*unit + unit - 1) str += '/';
      }
      
      let nstr = map.get(str);
      let idx = 0;

      for (let r=i*nunit; r<i*nunit+nunit; r++)
        for (let c=j*nunit; c<j*nunit+nunit; c++) {
          if (nstr[idx] == '/') idx++;

          narr[r][c] = nstr[idx];
          idx++;
        }
    }

  return narr.map(a=>a.join('')).join('/');
}