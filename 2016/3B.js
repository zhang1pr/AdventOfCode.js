function A(input) {
  const triangles = [[], [], []];
  let count = 0;

  input.split('\n').forEach(triangle => {
    const parts = triangle.split(' ').filter(string => string !== '');

    triangles[0].push(parseInt(parts[0], 10));
    triangles[1].push(parseInt(parts[1], 10));
    triangles[2].push(parseInt(parts[2], 10));
  });

  for (const triangle of triangles) {
    for (let i=0; i<triangle.length; i = i+3) {
      if (i+3 > triangle.length) {
        break;
      }

      if (
        triangle[i] + triangle[i+1] <= triangle[i+2]
        || triangle[i+1] + triangle[i+2] <= triangle[i+0]
        || triangle[i+0] + triangle[i+2] <= triangle[i+1]
      ) {
        continue;
      } else {
        count += 1;
      }
    }
  }

  return count;
}
