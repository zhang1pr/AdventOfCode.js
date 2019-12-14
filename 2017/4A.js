function A(input) {
  return input.split('\n').reduce((prev, curr) => {
    const passwords = curr.split(' ');
    return prev + (new Set(passwords).size === passwords.length ? 1 : 0);
  }, 0);
}
