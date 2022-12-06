const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0, total = 150;
  let arr = readnum(input).sort((a,b)=>a-b);
  let dp = [...Array(arr.length)].map(()=>[]);

  for (let i=0;i<arr.length;i++) {
    let cur = arr[i], curdp = dp[i];
    curdp.push(cur);

    for (let j=0;j<i;j++) {
      for (let num of dp[j]) {
        let sum = num + cur;

        if (sum == total) res++;
        else if (sum < total) curdp.push(sum);
      }
    }
  }

  return res;
}
