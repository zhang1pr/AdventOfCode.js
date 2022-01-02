const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let t = 0, total = 2503;
  let arr = readword(input).map(a => {
    let cur = a.split(' ');

    return [+cur[3], +cur[6], +cur[cur.length-2]];
  });

  let real = arr.map(a => a.slice());
  let score = Array(arr.length).fill(0);
  let dist = Array(arr.length).fill(0);

  while (t < total) {
    t++;

    for (let i=0; i<real.length; i++) {
      let [v, fly, rest] = real[i];

      if (fly == 0 && rest != 0) {
        real[i][2]--;
      } else {
        if (rest == 0) {
          real[i][1] = arr[i][1];
          real[i][2] = arr[i][2];   
        }

        real[i][1]--;

        dist[i] += v;
      }
    }

    let max = Math.max(...dist);
    
    for (let i=0;i<arr.length;i++) {
      if (dist[i] == max) {
        score[i]++;
      }
    } 
  }

  return Math.max(...score);
}
