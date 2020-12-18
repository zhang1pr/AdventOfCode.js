function A(input) {
  let res = 0;

  input.split('\n').forEach(line => {
    const arr = [];

    let temp;
    let sign;

    for (const num of line.split(' ')) {
      if (num == '*' || num == '+') {
        sign = num;
        continue;
      }
      
      let i = 0;
      while (num[i] == '(') {
        if (temp == null) {
          arr.push(0);
          arr.push('+');          
        } else {
          arr.push(temp);
          arr.push(sign);
          temp = null;
          sign = null;
        }

        i++;
      } 
       
      if (i != 0 || temp == null) {
        temp = Number(num.slice(i));
        continue;
      }

      const index = num.indexOf(')');
      const int = parseInt(num, 10);

      if (sign == '*') {
        temp *= int;
      } else {
        temp += int;
      }
      sign = null;    

      if (index != -1) {
        for (let i = index; i < num.length; i++) {
          sign = arr.pop();

          if (sign == '*') {
            temp *= arr.pop();
          } else {
            temp += arr.pop();
          }
        }
      }
    } 
    
    res += temp;
  });

  return res;
}
