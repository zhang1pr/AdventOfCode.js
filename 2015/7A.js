function A(input) {
  const map = new Map();

  const assignments = input.split('\n');

  while (true) {
    for (let i = 0; i < assignments.length; i++) {
      if (assignments[i] === '') {
        continue;
      }

      const assignment = assignments[i].split(' ');

      if (checkAssignment(assignment, map)) {
        const result = calculate(assignment, map);
        const variable = assignment[assignment.length - 1];

        if (variable === 'a') {
          return result;
        } else {
          map.set(variable, result);
        }

        assignments[i] = '';
      }
    }
  }
}

function checkAssignment(assignment, map) {
  if (assignment[0] !== 'NOT') {
    if (Number.isNaN(parseInt(assignment[0], 10)) && !map.has(assignment[0])) {
      return false;
    }

    if (Number.isNaN(parseInt(assignment[2], 10)) && !map.has(assignment[2]) && assignment.length === 5) {
      return false;
    }
  } else {
    if (Number.isNaN(parseInt(assignment[1], 10)) && !map.has(assignment[1])) {
      return false;
    }
  }

  return true;
}

function calculate(assignment, map) {
  let result;

  if (assignment.length === 3) {
    result = parseInt(assignment[0]);
    if (Number.isNaN(result)) {
      result = map.get(assignment[0]);
    }
  } else if (assignment.length === 4) {
    result = parseInt(assignment[1]);
    if (Number.isNaN(result)) {
      result = map.get(assignment[1]);
    }

    result = ~result & 0xFFFF;
  } else {
    result1 = parseInt(assignment[0]);
    result2 = parseInt(assignment[2]);

    if (Number.isNaN(result1)) {
      result1 = map.get(assignment[0]);
    }
    if (Number.isNaN(result2)) {
      result2 = map.get(assignment[2]);
    }

    switch(assignment[1]) {
      case 'AND':
        result = result1 & result2;
        break;
      case 'OR':
        result = result1 | result2;
        break;
      case 'LSHIFT':
        result = result1 << result2;
        break;
      case 'RSHIFT':
        result = result1 >> result2;
    }
  }

  return result;
}
