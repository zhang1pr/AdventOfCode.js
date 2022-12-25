const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = '';
  let arr = readword(input);

  let total = 0; 
  for (let str of arr) {
    let cur = 0, mul = 1;

    for (let i = str.length-1; i>=0; i--) {
      let val = str[i];
      if (val == '-') val = -1;
      if (val == '=') val = -2; 
      val = +val;
      cur += mul * val;
      mul *= 5;
    }

    total += cur;
  }

  let digits = [];
  while (total > 0) {
    let mod = total % 5;
    digits.push(mod);
    total = (total - mod)/5;
  }
  digits.push(0);

  for (let i=0; i<digits.length;i++) {
    if (digits[i] <= 2) {
      res = digits[i] + res;
    } else {
      let val = digits[i] - 5;
      
      if (val == '-2') val = '=';
      if (val == '-1') val = '-';
      res = val + res;
      digits[i+1]++;
    }
  }

  if (res[0] == '0')
    res = res.slice(1);

  return res;
}