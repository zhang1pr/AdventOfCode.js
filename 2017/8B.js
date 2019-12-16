function B(input) {
  const map = new Map();
  let max = 0;

  const signLegend = {
    '<': sm,
    '>': bg,
    '<=': smeq,
    '>=': bgeq,
    '==': eq,
    '!=': noteq
  }

  input.split('\n').forEach(line => {
    const parts = line.split(' ');
    const variable = parts[0];
    const action = parts[1];
    const number = parseInt(parts[2], 10);
    const anotherVariable = parts[4];
    const sign = parts[5];
    const anotherNumber = parseInt(parts[6], 10);

    if (!map.has(variable)) {
      map.set(variable, 0);
    }

    if (!map.has(anotherVariable)) {
      map.set(anotherVariable, 0);
    }

    variableValue = map.get(variable);
    anotherVariableValue = map.get(anotherVariable);

    if (getCondition(sign, anotherVariableValue, anotherNumber)) {
      let newValue;
      if (action === 'inc') {
        newValue = map.get(variable) + number;
        max = Math.max(max, newValue);
        map.set(variable, newValue);
      } else {
        newValue = map.get(variable) - number;
        max = Math.max(max, newValue);
        map.set(variable, map.get(variable) - number);
      }
    }
  });

  function getCondition(sign, a, b) {
    return signLegend[sign](a, b);
  }

  return max;
}

function sm(a, b) {
  return a < b;
}

function bg(a, b) {
  return a > b;
}

function eq(a, b) {
  return a === b;
}

function smeq(a, b) {
  return a <= b;
}

function bgeq(a, b) {
  return a >= b;
}

function noteq(a, b) {
  return a !== b;
}
