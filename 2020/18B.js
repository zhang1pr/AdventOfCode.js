function B(input) {
  let res = 0;

  input.split('\n').forEach(line => {
    const arr = [];

    let temp = 0;
    let sign = '+';
    let layer = 0;

    for (const num of line.split(' ')) {
      if (num == '*' || num == '+') {
        sign = num;

        if (num == '*') {
          arr.push(temp);
          arr.push(sign);
          arr.push(layer);
          temp = null;
          sign = null;
        }

        continue;
      }
      
      let i = 0;
      while (num[i] == '(') {
        if (sign == '+') {
          arr.push(temp);
          arr.push(sign);
          arr.push(layer);
          temp = null;
          sign = null;
        }
        
        layer++;
        i++;
      } 
       
      if (i != 0) {
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
          while (arr.length && arr[arr.length - 1] == layer) {
            arr.pop();
            sign = arr.pop();
            temp *= arr.pop();
          }

          layer--;

          if (arr.length && arr[arr.length - 1] == layer && arr[arr.length - 2] == '+') {
            arr.pop();
            sign = arr.pop();
            temp += arr.pop();
          }
        }
      }
    } 
  
    while (arr.length) {
      arr.pop();
      sign = arr.pop();
      temp *= arr.pop();
    }

    res += temp;
  });

  return res;
}
