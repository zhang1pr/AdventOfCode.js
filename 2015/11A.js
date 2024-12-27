const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = [...input];

  function doesNotContain(arr) {
    const ban = ['i', 'o', 'l'];
    const set = new Set(arr);

    return ban.every(ch => !set.has(ch));
  }

  function hasStreak(arr) {
    for (let i = 2; i < arr.length; i++) {
      let a = arr[i - 2].charCodeAt(0), b = arr[i - 1].charCodeAt(0), c = arr[i].charCodeAt(0);

      if (a + 1 == b && b + 1 == c) return true;
    }

    return false;
  }

  function hasPairs(arr) {
    let last;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] == arr[i - 1]) {
        if (last && last != arr[i]) return true;

        if (!last) last = arr[i];
        i++;
      }
    }

    return false;
  }

  while (true) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == 'z') {
        arr[i] = 'a';
      } else {
        arr[i] = String.fromCharCode(arr[i].charCodeAt(0) + 1);
        break;
      }
    }

    if (doesNotContain(arr) && hasStreak(arr) && hasPairs(arr)) {
      break;
    }
  }

  return arr.join('');
}

console.log(solve(input));