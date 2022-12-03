const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/-?\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let arr = readword(input);
  let tmp = '', tmp2 = '';
  let list = Array(arr[0].length).fill(0);
  
  for (let i=0;i<arr.length;i++) {
    let cur = arr[i];
    
    for (let j=0;j<cur.length;j++) {
      if (cur[j] == '1') {
        list[j]++;
      }
    }
  }

  for (let l of list) {
    if (l > arr.length - l) {
      tmp += '1';
      tmp2 += '0';
    } else {
      tmp += '0';
      tmp2 += '1'
    }
  }

  return parseInt(tmp,2) * parseInt(tmp2,2);
}
