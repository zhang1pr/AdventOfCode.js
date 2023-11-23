const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let set = new Set();
  let arr = readword(input).map(a => a.split('').map(a => +a));
  let a = [];

  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i];

    for (let j = 0; j < cur.length; j++) {
      let flag = true;

      for (let [di, dj] of darr) {
        let ni = i + di, nj = j + dj;

        if (arr[ni] == null || arr[ni][nj] == null) continue;


        if (arr[ni][nj] <= cur[j]) flag = false;
      }

      if (flag) {
        let cnt = 1;

        let q = [[i, j]];
        set.add(i + ',' + j);
        while (q.length) {
          let nq = [];

          for (let [a, b] of q) {
            for (let [da, db] of darr) {
              let na = a + da, nb = b + db;

              if (arr[na] == null || arr[na][nb] == null || arr[na][nb] == 9) continue;

              let str = na + ',' + nb;
              if (set.has(str)) continue;
              set.add(str);
              nq.push([na, nb]);
              cnt++;
            }
          }

          q = nq;
        }

        a.push(cnt);
      }
    }

  }

  a.sort((a, b) => b - a);

  return a[0] * a[1] * a[2];
}