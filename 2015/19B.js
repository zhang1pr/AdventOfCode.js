function B(input) {
  const shortMap = new Map();
  const longMap = new Map();
  const eMap = new Map();
  const letterMap = new Map();
  let step = 0;

  input.split('\n').forEach(line => {
    const parts = line.split(' ');

    if (parts.length === 3) {
      if (parts[2].includes('n')) {
        const nindex = parts[2].indexOf('n');
        const initial = parts[2].slice(0, nindex - 1);

        if (letterMap.has(initial)) {
          const result = letterMap.get(initial);
          result.push(parts[2].slice(nindex + 1, -2));
          letterMap.set(initial, result);
        } else {
          letterMap.set(initial, [parts[2].slice(nindex + 1, -2)]);
        }

        longMap.set(parts[2], parts[0]);
      } else if (parts[0] !== 'e') {
        shortMap.set(parts[2], parts[0]);
      } else {
        eMap.set(parts[2], parts[0]);
      }
    } else {
      string = parts[0];
    }
  });

  while (true) {
    let start = 0;
    let Rcount = 0;
    let chunks = [];
    let lastLetter;

    for (i = 0; i < string.length; i++) {
      if (string[i] === 'R') {
        Rcount += 1;
        lastLetter = 'R';
        if (letterMap.has(string[i-1])) {
          start = i - 1;
        } else {
          start = i - 2;
        }
      }

      if (string[i] === 'r' && lastLetter === 'R') {
        lastLetter = 'r';
        chunks.push(string.slice(start, i+1));
      }
    }

    if (Rcount === 0) {
      break;
    }

    for (const chunk of chunks) {
      result = findLongReplacement(chunk, shortMap, longMap, letterMap);

      string = string.split(chunk).join(result[0]);
      step += result[1];
    }
  }

  let lastStep = Infinity;

  for (const key of eMap.keys()) {
    lastStep = Math.min(lastStep, replace(string, key, shortMap));
  }

  return step + lastStep + 1;
}

function findLongReplacement(chunk, shortMap, longMap, letterMap) {
  if (!longMap.has(chunk)) {
    let firstElement;
    let target;

    if (letterMap.has(chunk[0])) {
      firstElement = chunk[0];
      target = chunk.slice(3, -2);
    } else {
      firstElement = chunk.slice(0, 2);
      target = chunk.slice(4, -2);
    }

    const result = findShortReplacement(target, shortMap, firstElement, letterMap);
    chunk = firstElement + 'Rn' + result[0] + 'Ar';

    return [longMap.get(chunk), result[1] + 1];
  } else {
    return [longMap.get(chunk), 1];
  }
}

function findShortReplacement(chunk, shortMap, firstElement, letterMap) {
  let step = Infinity;
  let resultString;

  for (const target of letterMap.get(firstElement)) {
    const thisStep = replace(chunk, target, shortMap);

    if (step > thisStep) {
      step = thisStep;
      resultString = target;
    }
  }

  return [resultString, step];
}

function replace(chunk, target, shortMap) {
  let step = 0;

  while (chunk !== target) {
    let flag = true;

    for (let i = chunk.length; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        const string = chunk.slice(j, i);

        if (shortMap.has(string)) {
          chunk = chunk.slice(0, j) + shortMap.get(string) + chunk.slice(i);
          step += 1;
          flag = false;

          if (chunk.length < target.length) {
            return Infinity;
          }

          break;
        }
      }
    }

    if (flag) {
      return Infinity;
    }
  }

  return step;
}
