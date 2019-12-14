function B(input) {
  const array = input.split('\n');

  for (let i = 0; i < array.length; i++) {
    for (let j = i+1; j < array.length; j++) {
      const string1 = array[i];
      const string2 = array[j];
      let flag = false;
      let k;

      for (k = 0; k < string1.length; k++) {
        if (string1[k] !== string2[k]) {
          if (flag === false) {
            flag = k;
          } else {
            flag = false;
            break;
          }
        }
      }

      if (flag !== false) {
        return string1.slice(0, k) + string1.slice(k+1);
      }
    }
  }
}
