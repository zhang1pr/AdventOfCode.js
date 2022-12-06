const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let arr = input;
  let str = '';
  let res = 0;
  
  for (let ch of arr) {
    let cur = parseInt(ch,16).toString(2);

    str += cur.padStart(4,'0');
  }

  function DFS(i) {
    if (i >= str.length) return i;

    let v = parseInt(str.slice(i, i+3),2); i+=3;
    res += v;
    let id = parseInt(str.slice(i, i+3),2); i+=3;

    if (id == 4) {
      let cur;
      while (true) {
        cur = str.slice(i, i+5);
        i+=5;
        if (cur[0] == '0') break;
      }
    } else {
      let mode = str[i]; i++;
      let l;
     
      if (mode == '0') {
        l = parseInt(str.slice(i, i+15),2); i+=15;  
        let ni;

        while (l > 0) {
          ni = DFS(i);
          l -= (ni - i);
          i = ni;
        }
      } else {
        l = parseInt(str.slice(i, i+11),2); i+=11;  

        while (l > 0) {
          l--;

          i = DFS(i);
        }
      }
    }
    
    return i;
  }

  DFS(0);

  return res;
}
