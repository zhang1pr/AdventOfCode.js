function A(input) {
  return input.split('\n').reduce((prev, curr) => {
    return prev + getPaper(curr.split('x'));
  }, 0)
}

function getPaper(array) {
  const sortedArray = array.map(a => parseInt(a, 10)).sort((a,b)=>(a-b));
  return 3*sortedArray[0]*sortedArray[1] + 2*(sortedArray[0]*sortedArray[2] + sortedArray[1]*sortedArray[2]);
}
