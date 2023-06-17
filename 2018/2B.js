const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let arr = readword(input).sort();

  for (let i=1; i<arr.length; i++) {
    let str = '';
    let word1 = arr[i-1], word2 = arr[i];
    let cnt = 0;

    for (let j=0; j<word1.length; j++) {
      if (word1[j] == word2[j]) str += word1[j];
      else cnt++;
    }

    if (cnt == 1) return str;
  }
}