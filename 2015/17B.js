const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0, total = 150;
  let arr = readnum(input).sort((a, b) => a - b);
  let dp = [...Array(arr.length)].map(() => []);
  let max = arr.length;

  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i], curdp = dp[i];
    curdp.push([cur, 1]);

    for (let j = 0; j < i; j++) {
      for (let [num, used] of dp[j]) {
        let sum = num + cur;
        let nused = used + 1;

        if (sum == total) {
          if (nused < max) {
            max = nused;
            res = 1;
          } else if (nused == max) {
            res++;
          }
        } else if (sum < total) {
          curdp.push([sum, nused]);
        }
      }
    }
  }

  return res;
}