function A(input) {
  const numberMap = new Map();
  const stringMap = new Map();
  const resultMap = new Map();
  let string;
  let count = 0;
  let maxLengthDiff = 0;

  input.split('\n').forEach(line => {
    const parts = line.split(' ');

    if (parts.length === 3) {
      const lengthDiff = parts[2].length - parts[0].length;
      maxLengthDiff = Math.max(maxLengthDiff, lengthDiff);
      if (numberMap.has(lengthDiff)) {
        const newArray = numberMap.get(lengthDiff);
        newArray.push([parts[0], parts[2]]);
        numberMap.set(lengthDiff, newArray);
      } else {
        numberMap.set(lengthDiff, [[parts[0], parts[2]]]);
      }

      if (stringMap.has(parts[0])) {
        const newArray = stringMap.get(parts[0]);
        newArray.push(parts[2]);
        stringMap.set(parts[0], newArray);
      } else {
        stringMap.set(parts[0], [parts[2]]);
      }
    } else {
      string = parts[0];
    }
  })

  for (let i=0; i<string.length; i++) {
    for (let j=1; j<3; j++) {
      const thisString = string.slice(i, i+j);

      if (stringMap.has(thisString)) {
        const stringMapArray = stringMap.get(thisString);

        for (let x=0; x<stringMapArray.length; x++) {
          const diff = stringMapArray[x].length - thisString.length;
          const array = numberMap.get(diff);

          for (y=0; y<array.length; y++) {
            const result = string.slice(0, i) + stringMapArray[x] + string.slice(i+j);

            if (!resultMap.has(diff)) {
              const set = new Set();
              set.add(result);
              resultMap.set(diff, set);
              count += 1;
            } else if (!resultMap.get(diff).has(result)) {
              const set = resultMap.get(diff);
              set.add(result);
              resultMap.set(diff, set);
              count += 1;
            }
          }
        }
      }
    }
  }

  return count;
}
