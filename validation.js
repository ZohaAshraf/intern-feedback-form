// validation.js
function validatePhone(number) {
  // accepts formats like 03001234567 or +923001234567
  const cleaned = number.replace(/[\s-]/g, "");
  const pattern = /^(\+92|0)?3[0-9]{9}$/;
  return pattern.test(cleaned);
}

module.exports = { validatePhone };
// testing branch protection