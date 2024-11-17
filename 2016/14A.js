const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));
const crypto = require('crypto');

function solve(input) {
  let str = input;
  let num = 0, i = 0;
  let arr = [];

  function getTriplet(hex) {
    for (let i = 0; i < hex.length - 2; i++)
      if (hex[i] == hex[i + 1] && hex[i + 1] == hex[i + 2])
        return hex[i];

    return null;
  }

  function getHex(num) {
    if (arr[num]) return arr[num];

    let hex = crypto.createHash('md5').update(str + num).digest('hex');

    arr[num] = hex;

    return hex;
  }

  while (true) {
    let hex = getHex(num);
    let ch = getTriplet(hex);

    if (ch) {
      for (let num2 = num + 1; num2 <= num + 1000; num2++) {
        let nhex = getHex(num2);

        if (nhex.includes(ch.repeat(5))) {
          i++;

          break;
        }
      }
    }

    if (i == 64) break;

    num++;
  }

  return num;
}