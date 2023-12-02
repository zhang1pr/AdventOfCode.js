const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0;
  let arr = readword(input);
  let reg = /(\d+) (red|green|blue)/g;

  for (let i = 0; i < arr.length; i++) {
    let x = arr[i];
    let red = 0, green = 0, blue = 0;

    for (let [match, cnt, col] of x.matchAll(reg)) {
      cnt = +cnt;

      if (col == 'red')
        red = Math.max(red, cnt);
      else if (col == 'green')
        green = Math.max(green, cnt);
      else if (col == 'blue')
        blue = Math.max(blue, cnt);
    }

    res += red * green * blue;
  }

  return res;
}