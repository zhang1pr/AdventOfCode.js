const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input);

  for (let str of arr) {
    let outside = true, flag = false;
    let map = new Map();

    for (let i = 0; i < str.length - 2; i++) {
      if (str[i] == '[' || str[i] == ']') {
        outside = !outside;
        continue;
      }

      if (str[i] != str[i + 1] && str[i] == str[i + 2]) {
        let key = outside ? str[i] + str[i + 1] : str[i + 1] + str[i];
        let val = outside ? 1 : -1;

        for (let num of map.get(key) || []) {
          if (num + val == 0) {
            res++;
            flag = true;
          }
        }

        if (flag) break;
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(val);
      }
    }
  }

  return res;
}

console.log(solve(input));