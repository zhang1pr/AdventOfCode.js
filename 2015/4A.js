function A(input) {
  const number = 0;
  let hash = input;

  // Import SparkMD5
  // https://cdnjs.cloudflare.com/ajax/libs/q.js/1.4.1/q.js
  // https://cdnjs.cloudflare.com/ajax/libs/spark-md5/2.0.2/spark-md5.min.js
  while (!SparkMD5.hash(hash).startsWith('00000')) {
    number += 1;
    hash = input + number.toString();
  }

  return number;
}
