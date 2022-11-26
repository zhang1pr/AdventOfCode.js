const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));
const crypto = require('crypto');

function B(input) {
  let str = input;
  let num = 0, i = 0;
  let res = Array(8);

  while (i < 8) {
    let cur = str + num;
    let hex = crypto.createHash('md5').update(cur).digest('hex');
    
    if (hex.startsWith('00000') && hex[5] >= '0' && hex[5] <= '7' && res[hex[5]] == null) {
      res[hex[5]] = hex[6];
      i++;
    }

    num++;
  }

  return res.join('');
}
