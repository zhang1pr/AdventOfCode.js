const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['U', [-1, 0]], ['D', [1, 0]], ['L', [0, -1]], ['R', [0, 1]]]);
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let set = new Set().add('0,0');
  let arr = readword2d(input);
  let LEN = 10;
  let queue = [...Array(LEN)].map(() => [0, 0]);

  for (let [dir, num] of arr) {
    num = +num;

    let [vr, vc] = dmap.get(dir);

    for (let i = 1; i <= num; i++) {
      queue[0][0] += vr;
      queue[0][1] += vc;

      for (let q = 1; q < LEN; q++) {
        let [headr, headc] = queue[q - 1], [tailr, tailc] = queue[q];

        let dr = headr - tailr, dc = headc - tailc;
        let unitr = dr / Math.abs(dr), unitc = dc / Math.abs(dc);

        if (Math.abs(dr) + Math.abs(dc) > 2) {
          tailr += unitr;
          tailc += unitc;
        } else if (Math.abs(dr) > 1) {
          tailr += unitr;
        } else if (Math.abs(dc) > 1) {
          tailc += unitc;
        }

        queue[q] = [tailr, tailc];

        if (q == LEN - 1)
          set.add(tailr + ',' + tailc);
      }
    }
  }

  return set.size;
}