const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map([['children', 3], ['cats', 7], ['samoyeds', 2], ['pomeranians', 3],['akitas', 0], ['vizslas', 0], ['goldfish', 5], ['trees', 3], ['cars', 2], ['perfumes', 1]]);
  
  let arr = readword(input).map(a => {
    let cur = a.split(' ').slice(2);
    let list = [];

    for (let i=0; i<cur.length; i+=2) {
      let item = cur[i], val = cur[i+1];
      item = item.slice(0, item.length-1);
      val = parseInt(val, 10);

      list.push([item, val]);      
    }

    return list;
  }); 
  
  for (let i=0;i<arr.length;i++) {
    let items = arr[i];

    if (items.every(([item, val]) => {
      return !map.has(item) || map.get(item) == val;
    })) {
      return i+1;
    }
  }
}
