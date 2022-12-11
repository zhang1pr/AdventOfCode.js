const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let arr = readword(input);
  let cnt = Array(arr.length).fill(0);
  let q = [];
  let multi = 1;

  for (let i = 0; i < arr.length; i+=7) {
    let [id] = readnum(arr[i]);
    let items = readnum(arr[i+1]);
    let [div] = readnum(arr[i+3]);
  
    multi *= div;
    q[id] = items;
  }

  for (let rd = 1; rd <= 10000; rd++) {
    for (let i = 0; i < arr.length; i+=7) {
      let [id] = readnum(arr[i]);
      let op = arr[i+2].split('=')[1];
      let [div] = readnum(arr[i+3]);
      let [t] = readnum(arr[i+4]);
      let [f] = readnum(arr[i+5]);
      
      for (let x of q[id]) {
        let old = x;
        let nx = eval(op) % multi;
        cnt[id]++;

        if (nx % div == 0)
          q[t].push(nx);
        else 
          q[f].push(nx);
      }

      q[id] = [];
    }
  }

  cnt.sort((a,b)=>b-a);
  return cnt[0]*cnt[1];
}
