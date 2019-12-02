function A(input) {
  const containers = [];

  input.split('\n').forEach(number => {
    containers.push(parseInt(number, 10));
  });

  return calculateCombination(150, containers);
}

function calculateCombination(remainder, containers) {
  if (containers.length === 1) {
    if (remainder === 0 || remainder === containers[0]) {
      return 1;
    } else {
      return 0;
    }
  }

  let count = 0;

  for (let i=0; i<= (remainder >= containers[0] ? 1 : 0); i++) {
    count += calculateCombination(remainder - i*containers[0], containers.slice(1));
  }

  return count;
}
