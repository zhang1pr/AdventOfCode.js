function A(input) {
  const steps = Array(6).fill(0);
  const directions = ['n', 'ne', 'se', 's', 'sw', 'nw'];

  input.split(',').forEach(direction => {
    steps[directions.indexOf(direction)] += 1;
  })

  for (let i = 0; i < steps.length/2; i++) {
    const min = Math.min(steps[i], steps[i+3]);
    steps[i] -= min;
    steps[i+3] -= min;
  }

  for (let i = 0; i < steps.length; i++) {
    const left = i;
    const right = i+2 >= steps.length ? i-4 : i+2;
    const middle = i+1 >= steps.length ? i-3 : i+1;
    const otherMiddle = middle+3 >= steps.length ? middle-3 : middle+3;

    if (steps[left] && steps[right]) {
      const min = Math.min(steps[left], steps[right]);
      steps[left] -= min;
      steps[right] -= min;

      if (steps[otherMiddle]) {
        steps[otherMiddle] -= min;
      } else {
        steps[middle] += min;
      }
    }
  }

  return steps.reduce((prev, curr) => prev + curr);
}
