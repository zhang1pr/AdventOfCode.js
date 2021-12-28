const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));
const crypto = require('crypto');

function B(input) {
  let str = input;
  let num = 1;

  while (true) {
    let cur = str + num;
    let hex = crypto.createHash('md5').update(cur).digest('hex');
    
    if (hex.startsWith('000000')) return num;

    num++;
  }
}
