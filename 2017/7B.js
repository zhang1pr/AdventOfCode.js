function B(input) {
  const set = new Set();
  const singleMap = new Map();
  const map = new Map();
  const array = [];

  input.split('\n').forEach(line => {
    if (line.indexOf('->') === -1) {
      const name = line.split(' ')[0];
      const weight = parseInt(line.split('(')[1], 10);
      singleMap.set(name, weight);
      map.set(name, weight);
      set.add(name);
    } else {
      const parts = line.split(' -> ');
      const bottom = parts[0];
      const tops = parts[1];

      const name = bottom.split(' ')[0];
      const weight = parseInt(bottom.split('(')[1], 10);
      map.set(name, weight);
      singleMap.set(name, weight);
      array.push([name, weight, tops.split(', ')]);
    }
  });

  while (true) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '') {
        continue;
      }

      const tops = array[i][2];
      let flag = false;
      for (const top of tops) {
        if (!set.has(top)) {
          flag = true;
          break;
        }
      }

      if (flag) {
        continue;
      }

      const name = array[i][0];
      const weight = array[i][1];

      array[i] = '';

      const numbers = [];
      let count = 0;
      for (const top of tops) {
        const number = map.get(top);
        count += number;

        if (numbers.length < 2) {
          if (!numbers.includes(number)) {
            if (tops.indexOf(top) === tops.length - 1) {
              return singleMap.get(top) - number + numbers[0];
            } else {
              numbers.push(number);
            }
          }
        } else {
          return singleMap.get(top) - number + number === numbers[0] ? numbers[1] : numbers[0];
        }
      }

      set.add(name);
      map.set(name, count+weight);
    }
  }
}
