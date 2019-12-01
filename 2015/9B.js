function B(input) {
  const map = new Map();
  const destinations = [];
  let longestPath = 0;

  input.split('\n').forEach(route => {
    parts = route.split(' ');

    map.set(`${parts[0]}-${parts[2]}`, parseInt(parts[4], 10));
    if (!destinations.includes(parts[0])) {
      destinations.push(parts[0]);
    }

    if (!destinations.includes(parts[2])) {
      destinations.push(parts[2]);
    }
  });

  for (const destination of destinations) {
    const currentPath = findlongestPath(
      map,
      destination,
      destinations.filter( d => d !== destination )
    )

    longestPath = Math.max(longestPath, currentPath);
  }

  return longestPath;
}

function findlongestPath(map, city, destinations) {
  if (destinations.length === 1) {
    if (map.has(`${city}-${destinations[0]}`)) {
      return map.get(`${city}-${destinations[0]}`);
    } else if (map.has(`${destinations[0]}-${city}`)) {
      return map.get(`${destinations[0]}-${city}`);
    } else {
      return 0;
    }
  }

  let currentLongestPath = 0;

  for (const destination of destinations) {
    const nextPath = findlongestPath(
      map,
      destination,
      destinations.filter( d => d !== destination)
    )

    let currentPath = 0;

    if (map.has(`${city}-${destination}`)) {
      currentPath = map.get(`${city}-${destination}`);
    } else if (map.has(`${destination}-${city}`)) {
      currentPath = map.get(`${destination}-${city}`);
    }

    currentLongestPath = Math.max(currentLongestPath, nextPath + currentPath);
  }

  return currentLongestPath;
}
