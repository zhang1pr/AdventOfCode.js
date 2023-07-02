const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let t = 0;
  let arr = readword(input).map(a=>a.split(''));
 
  while (t < 100) {
    t++;
    let narr = arr.map(a=>a.slice());
    
    for (let i=0;i<arr.length;i++) {
      let row = arr[i];
  
      for (let j=0;j<row.length;j++) {
        let val = arr[i][j];
        let sum = 0;

        for (let [di, dj] of ddarr) {
          let ni = i+di, nj = j+dj;

          sum += arr[ni] && arr[ni][nj] == '#' ? 1 : 0;
        }

        if (val == '#') {
          if (sum != 2 && sum != 3) {
            narr[i][j] = '.';
          }
        } else {
          if (sum == 3) {
            narr[i][j] = '#';
          }
        }
      }
    }

    arr = narr;
  }

  return arr.reduce((a,b) => a + b.reduce((c,d) => c + (d == '#' ? 1 : 0), 0), 0);
}
