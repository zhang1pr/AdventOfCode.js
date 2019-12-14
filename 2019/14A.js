function A(input) {
  const array = [];
  const map = new Map();
  map.set('FUEL', 1);

  const wasteMap = new Map();
  const oreMap = new Map();

  input = input.split('\n').forEach(line => {
    const things = [];
    const parts = line.split(' => ');

    const materials = parts[0];
    const results = parts[1];
    const material = materials.split(', ');

    if (material[0].endsWith('ORE')) {
      oreMap.set(results, parseInt(material[0].split(' ')[0], 10));
    } else {
      things.push([parseInt(results.split(' ')[0], 10), results.split(' ')[1]]);


      material.forEach(m => {
        things.push([parseInt(m.split(' ')[0], 10), m.split(' ')[1]]);
      });

      array.push(things);
    }
  });

  while (true) {
    let flag = true;

    for (let i = 0; i <array.length; i++) {
      const [target, ...rests] = array[i];
      if (!map.has(target[1])) {
        continue;
      } else {
        flag = false;
      }

      const targetNumber = map.get(target[1]);
      map.delete(target[1]);

      let quotient = targetNumber/target[0];
      quotient = Number.isInteger(quotient) ? quotient : Math.floor(quotient) + 1;

      const waste = quotient * target[0] - targetNumber;

      if (waste > 0) {
        if (!wasteMap.has(waste)) {
          wasteMap.set(target[1], waste);
        } else {
          wasteMap.set(target[1], wasteMap.get(target[1]) + waste);
        }
      }

      for (const rest of rests) {
        let number = rest[0] * quotient;
        const name = rest[1];
        if (wasteMap.has(name)) {
          const produced = wasteMap.get(name);

          if (number > produced) {
            wasteMap.delete(name);
          } else {
            wasteMap.set(name, produced - number);
          }
          number -= produced;
        }

        if (!map.has(name)) {
          map.set(name, number);
        } else {
          const anotherNumber = map.get(name);
          map.set(name, number + anotherNumber);
        }
      }
    }

    if (flag) {
      break;
    }
  }

  let count = 0;
  for (const [result, number] of oreMap.entries()) {
    const resultNumber = parseInt(result.split(' ')[0], 10);
    const resultName = result.split(' ')[1];

    const resultNumberNeeded = map.get(resultName);
    let quotient = resultNumberNeeded/resultNumber;
    quotient = Number.isInteger(quotient) ? quotient : Math.floor(quotient) + 1;

    count += parseInt(number, 10) * quotient;
  }

  return count;
}
