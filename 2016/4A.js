const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readword(input);

  for (let str of arr) {
    let map = new Map();
    let [first, last] = str.split('[');
    first = first.split('-');
    let len = first.length;
    let frags = first.slice(0,len-1), num = +first[len-1];

    for (let chars of frags)
      for (let ch of chars)
        map.set(ch, (map.get(ch) || 0) + 1);

    let order = [...map].sort((a,b)=> {
      if (a[1] == b[1])
        return a[0] < b[0] ? -1 : 1;
      else
        return b[1] - a[1]; 
    }).slice(0, 5).map(a=>a[0]); 

    let set = new Set(order);
    for (let ch of last)
      if (ch != ']')
        set.add(ch)
    
    if (set.size == 5)
      res += num;
  }

  return res;
}
