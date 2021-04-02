const { palindromo } = require('../utils/for_testing');

test.skip('palindrome of luis', () => {
  const result = palindromo('luis');

  expect(result).toBe('siul');
});

test.skip('palindorme of empty string', () => {
  const result = palindromo('');

  expect(result).toBe('');
});

test.skip('palindorme of empty undefine', () => {
  const result = palindromo();

  expect(result).toBe('');
});
