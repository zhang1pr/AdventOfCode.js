const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readword(input);

  function hasVowel(str) {
    let set = new Set('aeiou');
    let cnt = 0;

    for (let ch of str) {
      if (set.has(ch)) {
        cnt++;

        if (cnt == 3) return true;
      }
    }

    return false;
  }

  function hasDoubleChar(str) {
    for (let i = 1; i < str.length; i++) {
      if (str[i] == str[i - 1]) return true;
    }

    return false;
  }

  function doesNotContain(str) {
    let ban = ['ab', 'cd', 'pq', 'xy'];

    return ban.every(w => !str.includes(w));
  }

  for (let str of arr) {
    if (hasVowel(str) && hasDoubleChar(str) && doesNotContain(str)) {
      res++;
    }
  }

  return res;
}