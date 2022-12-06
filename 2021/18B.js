const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let arr = readword(input);
  let cur;

  function explode(str) {
    let left, right;
    let nstr = str;
    let cnt = 0;
  
    for (let i=0;i<str.length;i++) {
      let cur = str[i];

      if (cur == '[') {
        left = i;
        cnt++;
      } else if (cur == ']') {
        right = i;
        cnt--;

        if (cnt == 4) {
          let arr = JSON.parse(str.slice(left, right+1));
          let [lval, rval] = arr;
          let lstr = str.slice(0, left);
          let mid = '0';
          let rstr = str.slice(right+1);
          
          if (lstr) {
            let match = [...lstr.matchAll(/\d+/g)];
            let len = match.length;
            let rlstr = [...lstr].reverse().join('');
            if (len) {
              rlstr = rlstr.replace((/\d+/), [...(+match[len-1] + lval).toString()].reverse().join('')); 
              lstr = [...rlstr].reverse().join('');
            }
          } 
         
          if (rstr) {
            let match = [...rstr.matchAll(/\d+/g)];
 
            if (match.length) {
              rstr = rstr.replace((/\d+/),(+match[0] + rval).toString());
            }
          }
          
          nstr = lstr + mid + rstr;
          break;
        }
      }
    }

    return nstr;
  }

  function split(str) {
    let left, right;
    let nstr = str;

    for (let i=0;i<str.length;i++) {
      let cur = str[i];
      if (cur == '[' || left == null && cur == ',') {
        left = i;
      } else if (cur == ']' || cur == ',') {
        right = i;
     
        if (left != null) {
          let num = +str.slice(left+1, right);
          
          if (num >= 10) {  
            let lval = Math.floor(num/2), rval = Math.ceil(num/2);

            let nval = '[' + lval.toString() + ',' + rval.toString() + ']';

            nstr = str.slice(0, left+1) + nval + str.slice(right);
            break;
          }       
        } 

        left = right;
      }
    } 

    return nstr;
  }

  function sum(arr) { 
    if (!Array.isArray(arr)) {
      return arr;
    } else {
      return 3*sum(arr[0]) + 2*sum(arr[1]);
    }
  }

  function add(res, next) {
    cur = '[' + res + ',' + next + ']';
    let str;
    
    let flag = true;

    while (flag) {
      flag = false;

      while (true) {
        str = explode(cur);

        if (str != cur) {
          flag = true;
          cur = str;
        }

        break;
      }

      if (!flag) {
        while (true) {
          str = split(cur);
  
          if (str != cur) {
            flag = true;
            cur = str;
          }
  
          break;
        }
      }
    }

    return sum(JSON.parse(cur));
  }

  let max = 0;
  for (let i=0;i<arr.length;i++) {
    for (let j=i+1;j<arr.length;j++) {
      max = Math.max(max, add(arr[i],arr[j]), add(arr[j],arr[i]));
    }
  }

  return max;
}
