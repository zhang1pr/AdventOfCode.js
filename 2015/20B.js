const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/-?\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let target = Number(input);
  
  const arr = []
  
  for (let i = 1; i < target / 10; i++) {
    let cnt = 0

    for (let j = i; j < target / 10; j += i) {
      if (!arr[j]) arr[j] = 1;
      
      if (cnt >= 50) break;

      arr[j] += i * 11;
      cnt++;
    }
  }

  return arr.findIndex(a => a >= target);
}
