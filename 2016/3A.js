function A(input) {
  const triangles = [];
  let count = 0;

  input.split('\n').forEach(triangle => {
    const sides = [];

    triangle.split(' ').forEach(side => {
      if (side !== '') {
        sides.push(parseInt(side, 10));
      }
    });

    triangles.push(sides);
  });

  for (const triangle of triangles) {
    if (
      triangle[0] + triangle[1] <= triangle[2]
      || triangle[1] + triangle[2] <= triangle[0]
      || triangle[0] + triangle[2] <= triangle[1]
    ) {
      continue;
    } else {
      count += 1;
    }
  }

  return count;
}
