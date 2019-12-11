function B(input) {
  let count = 0;

  input.split('\n').forEach(line => {
    const numbers = line.split(/\s+/).map(Number)
    count += findQuotient(numbers);
  });

  return count;
}

function findQuotient(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i+1; j < numbers.length; j++) {
      if (numbers[i]%numbers[j] === 0) {
        return numbers[i]/numbers[j];
      }

      if (numbers[j]%numbers[i] === 0) {
        return numbers[j]/numbers[i];
      }
    }
  }
}
