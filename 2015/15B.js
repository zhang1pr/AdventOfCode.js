function B(input) {
  const materials = []

  input.split('\n').forEach(material => {
    materials.push([]);

    material.split(',').forEach(string => {
      strings = string.split(' ');

      materials[materials.length-1].push(parseInt(strings[strings.length-1]));
    });
  });

  return calculateScore(materials, materials.slice(), 100, []);
}

function calculateScore(materials, typeRemaining, remainder, numbers) {
  if (typeRemaining.length === 1) {
    numbers.push(remainder);

    const scores = Array(5).fill(0);

    for (i = 0; i < numbers.length; i++) {
      for (s = 0; s < 5; s++) {
        scores[s] += numbers[i] * materials[i][s];
      }
    }

    if (scores[4] !== 500) {
      return -Infinity;
    }

    return scores.slice(0,4).reduce((prev, curr) => {
      if (curr <= 0) {
        return 0;
      } else {
        return prev * curr;
      }
    }, 1);
  }

  let max = -Infinity;
  typeRemaining = typeRemaining.slice(1);

  for (let i = 0; i < remainder+1; i++) {
    const numbersCopy = numbers.slice();
    numbersCopy.push(i);
    max = Math.max(max, calculateScore(materials, typeRemaining, remainder - i, numbersCopy));
  }

  return max;
}
