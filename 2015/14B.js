function B(input) {
  const reindeers = [];
  const distances = [];
  const points = Array(8).fill(0);

  input.split('\n').forEach(string => {
    const parts = string.split(' ');
    reindeers.push([parseInt(parts[3]), parseInt(parts[6]), parseInt(parts[13])]);
    distances.push([0, parseInt(parts[6]), 0]);
  });

  for (let t=0; t<2503; t++) {
    for (let i=0; i<reindeers.length; i++) {
      if (distances[i][1] > 0) {
        distances[i][0] += reindeers[i][0];
        distances[i][1] -= 1;

        if (distances[i][1] === 0) {
          distances[i][2] = reindeers[i][2];
        }
      } else {
        distances[i][2] -= 1;

        if (distances[i][2] === 0) {
          distances[i][1] = reindeers[i][1];
        }
      }
    }

    const max = Math.max(...distances.map(d => d[0]));
    for (i = 0; i < points.length; i++) {
      if (distances[i][0] === max) {
        points[i] += 1;
      }
    }
  }

  return distances[points.indexOf(Math.max(...points))][0];
}
