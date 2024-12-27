const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = 0;
  let arr = readword(input).map(a => a.split('').map(a => +a));
  let t = 0;

  while (t < 100) {
    t++;
    set = new Set();

    let narr = arr.map(a => a.slice());

    for (let i = 0; i < narr.length; i++) {
      let row = narr[i];
      for (let j = 0; j < row.length; j++) {
        let cur = row[j], curs = i + ',' + j;
        if (set.has(curs)) continue;

        cur++;
        narr[i][j] = cur;

        if (cur > 9) {
          let q = [[i, j]];

          while (q.length) {
            let nq = [];

            for (let [a, b] of q) {
              narr[a][b] = 0;
              set.add(a + ',' + b);
              res++;

              for (let [di, dj] of ddarr) {
                let ni = a + di, nj = b + dj, str = ni + ',' + nj;
                if (arr[ni] == null || arr[ni][nj] == null) {
                  continue;
                }

                if (set.has(str)) continue;

                narr[ni][nj]++;

                if (narr[ni][nj] > 9) {
                  narr[ni][nj] = 0;
                  nq.push([ni, nj]);
                }
              }
            }

            q = nq;
          }
        }
      }

      arr = narr;
    }
  }

  return res;
}

console.log(solve(input));