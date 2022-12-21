const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));
class Node{constructor(s,t,c){this.val=s,this.prev=t,this.next=c}}

function B(input) {
  let res = 0;
  let arr = readword(input).map(a => new Node(a * 811589153));
  let len = arr.length;

  for (let i=1;i<arr.length;i++) {
    arr[i-1].next = arr[i];
    arr[i].prev = arr[i-1];
  }
  arr.at(-1).next = arr[0];
  arr[0].prev = arr.at(-1);

  for (let t=0; t<10; t++) {
    for (let node of arr) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      let [a,b] = [node.prev, node.next];
  
      let move = (node.val % (len - 1) + len - 1) % (len - 1);
      while (move) {
        a = a.next;
        b = b.next;
        move--;
      }
          
      a.next = node;
      node.prev = a;
      b.prev = node;
      node.next = b;
    }
  }

  let cur;
  for (let node of arr)
    if (node.val == 0)
      cur = node;

  for (let t=0; t<3; t++) {
    for (let i=0; i<1000; i++)
      cur = cur.next;
    res += cur.val;
  }

  return res;
}
