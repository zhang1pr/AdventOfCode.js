const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0;
  let arr = input;
  let str = '';

  for (let ch of arr) {
    let cur = parseInt(ch, 16).toString(2);

    str += cur.padStart(4, '0');
  }

  function DFS(i) {
    if (i >= str.length) return i;

    let v = parseInt(str.slice(i, i + 3), 2); i += 3;
    res += v;
    let id = parseInt(str.slice(i, i + 3), 2); i += 3;

    let arr = [], val;

    if (id == 4) {
      while (true) {
        let bit = str[i]; i++;
        let cur = str.slice(i, i + 4);
        arr.push(cur);
        i += 4;
        if (bit == '0') break;
      }

    } else {
      let mode = str[i]; i++;
      let l;

      if (mode == '0') {
        l = parseInt(str.slice(i, i + 15), 2); i += 15;
        let ni;

        while (l) {
          [ni, val] = DFS(i);
          arr.push(val);
          l -= (ni - i);
          i = ni;
        }
      } else {
        l = parseInt(str.slice(i, i + 11), 2); i += 11;

        while (l > 0) {
          l--;

          [i, val] = DFS(i);
          arr.push(val);
        }
      }
    }

    if (id == 0) {
      val = arr.reduce((a, b) => a + b);
    } else if (id == 1) {
      val = arr.reduce((a, b) => a * b);
    } else if (id == 2) {
      val = Math.min(...arr);
    } else if (id == 3) {
      val = Math.max(...arr);
    } else if (id == 5) {
      val = arr[0] > arr[1] ? 1 : 0;
    } else if (id == 6) {
      val = arr[0] < arr[1] ? 1 : 0;
    } else if (id == 7) {
      val = arr[0] == arr[1] ? 1 : 0;
    } else if (id == 4) {
      val = parseInt(arr.join(''), 2);
    }

    return [i, val];
  }

  return DFS(0)[1];
}