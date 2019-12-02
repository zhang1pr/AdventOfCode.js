function A(input) {
  const reindeers = [];
  let count = 0;

  input.split('\n').forEach(string => {
    const parts = string.split(' ');
    reindeers.push([parseInt(parts[3]), parseInt(parts[6]), parseInt(parts[13])]);
  });

  for (const reindeer of reindeers) {
    const times = Math.floor(2503/(reindeer[1] + reindeer[2]));
    const remainder = 2503 % (reindeer[1] + reindeer[2]);

    const lastDistance = remainder < reindeer[1] ? remainder * reindeer[0] : reindeer[1] * reindeer[0];

    count = Math.max(count, reindeer[0] * reindeer[1] * times + lastDistance);
  }

  return count;
}
