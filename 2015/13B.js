function B(input) {
  const map = new Map();
  const people = [];
  const seating = [];

  input.split('\n').forEach(string => {
    const parts = string.split(' ');
    const result = parts[2] === 'gain' ? parseInt(parts[3]) : - parseInt(parts[3]);
    const person1 = parts[0];
    const person2 = parts[parts.length-1].split('.')[0];

    map.set(person1 + '-' + person2, result);

    if (!people.includes(parts[0])) {
      people.push(parts[0]);
    }
  });

  return optimizeSeating(people.length, people, seating, map);
}

function optimizeSeating(total, people, seating, map) {
  if (people.length === 1) {
    const person0 = people[0];
    seating.push(person0);
    const person1 = seating[total-2];

    return map.get(person1 + '-' + person0) + map.get(person0 + '-' + person1);
  } else {
    let count = -Infinity;

    for (let i=0; i<people.length; i++) {
      const person = people[i];
      seating[total-people.length] = person;
      const personLeft = seating[total-people.length-1];

      const next = optimizeSeating(total, people.filter(p => p !== people[i]), seating.slice(), map);
      const current = people.length === total ? 0 : map.get(person + '-' + personLeft) + map.get(personLeft + '-' + person);

      count = Math.max(count, current + next);
    }

    return count;
  }
}
