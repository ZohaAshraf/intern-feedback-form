const { validatePhone } = require('./validation');

test('accepts valid Pakistani number with leading 0', () => {
  expect(validatePhone('03001234567')).toBe(true);
});

test('accepts valid number with +92', () => {
  expect(validatePhone('+923001234567')).toBe(true);
});

test('rejects empty string', () => {
  expect(validatePhone('')).toBe(false);
});

test('rejects garbage input', () => {
  expect(validatePhone('abc123')).toBe(false);
});