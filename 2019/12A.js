function A(input) {
  const positions = [];
  const velocities = [];

  input.split('\n').forEach(line => {
    const parts = line.split(', ');
    positions.push([parseInt(parts[0].split('=')[1], 10), parseInt(parts[1].split('=')[1], 10), parseInt(parts[2].split('=')[1], 10)]);
    velocities.push([0, 0, 0]);
  });

  let step = 1000;

  while (step > 0) {
    step--;

    for (let i = 0; i < positions.length; i++) {
      for (let j = i+1; j < positions.length; j++) {
        [velocities[i], velocities[j]] = calculateVelocity(positions[i], positions[j], velocities[i], velocities[j]);
      }
    }

    for (let i = 0; i < positions.length; i++) {
      positions[i] = applyVelocity(positions[i], velocities[i]);
    }
  }

  const potential = positions.map(position => position.reduce((prev, curr) => {
    return Math.abs(prev) + Math.abs(curr);
  }));

  const kinetic = velocities.map(velocity => velocity.reduce((prev, curr) => {
    return Math.abs(prev) + Math.abs(curr);
  }));

  let sum = 0;

  for (let i = 0; i < potential.length; i++) {
    sum += potential[i] * kinetic[i];
  }

  return sum;
}

function calculateVelocity(p1, p2, v1, v2) {
  const px1 = p1[0];
  const py1 = p1[1];
  const pz1 = p1[2];
  const px2 = p2[0];
  const py2 = p2[1];
  const pz2 = p2[2];
  let vx1 = v1[0];
  let vy1 = v1[1];
  let vz1 = v1[2];
  let vx2 = v2[0];
  let vy2 = v2[1];
  let vz2 = v2[2];

  [vx1, vx2] = px1 > px2 ? [vx1 - 1, vx2 + 1] : [vx1, vx2];
  [vx1, vx2] = px1 < px2 ? [vx1 + 1, vx2 - 1] : [vx1, vx2];
  [vy1, vy2] = py1 > py2 ? [vy1 - 1, vy2 + 1] : [vy1, vy2];
  [vy1, vy2] = py1 < py2 ? [vy1 + 1, vy2 - 1] : [vy1, vy2];
  [vz1, vz2] = pz1 > pz2 ? [vz1 - 1, vz2 + 1] : [vz1, vz2];
  [vz1, vz2] = pz1 < pz2 ? [vz1 + 1, vz2 - 1] : [vz1, vz2];

  return [[vx1, vy1, vz1], [vx2, vy2, vz2]];
}

function applyVelocity(p1, v1) {
  let px1 = p1[0];
  let py1 = p1[1];
  let pz1 = p1[2];
  const vx1 = v1[0];
  const vy1 = v1[1];
  const vz1 = v1[2];

  px1 += vx1;
  py1 += vy1;
  pz1 += vz1;

  return [px1, py1, pz1];
}
