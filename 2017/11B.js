function B(input) {
  const steps = Array(6).fill(0);
  const directions = ['n', 'ne', 'se', 's', 'sw', 'nw']
  let max = 0;

  input.split(',').forEach(step => {
    const index = directions.indexOf(step);
    const otherIndex = index+3 >= steps.length ? index-3 : index+3;
    if (steps[otherIndex] != 0) {
      steps[otherIndex] -= 1;
    } else {
      steps[index] += 1;
    }

    for (let i = 0; i < steps.length; i++) {
      const left = i;
      const right = i+2 >= steps.length ? i-4 : i+2;
      const middle = i+1 >= steps.length ? i-5 : i+1;
      const otherMiddle = middle+3 >= steps.length ? middle-3 : middle+3;

      if (steps[left] != 0 && steps[right] != 0) {
        steps[left] -= 1;
        steps[right] -= 1;

        if (steps[otherMiddle] != 0) {
          steps[otherMiddle] -= 1;
        } else {
          steps[middle] += 1;
        }
      }
    }

    max = Math.max(max, steps.reduce((prev, curr) => prev + curr));
  })

  return max;
}
