function B(input) {
  const containers = [];

  input.split('\n').forEach(number => {
    containers.push(parseInt(number, 10));
  });

  return calculateCombination(150, containers)[0];
}

function calculateCombination(remainder, containers) {
  if (containers.length === 1) {
    if (remainder === containers[0]) {
      return [1, 1];
    } else if(remainder === 0) {
      return [1, 0];
    } else {
      return [0, Infinity];
    }
  }

  let count = 0;
  let min = Infinity;

  for (let i=0; i<= (remainder >= containers[0] ? 1 : 0); i++) {
    const current = calculateCombination(remainder - i*containers[0], containers.slice(1));
    if (current[1] + i === min) {
      count += current[0];
    } else if (current[1] + i < min) {
      min = current[1] + i;
      count = current[0];
    }
  }

  return [count, min];
}
