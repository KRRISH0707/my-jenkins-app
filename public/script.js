function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

function calc(op) {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const fns = { add, subtract, multiply, divide };
  try {
    document.getElementById('result').textContent = 'Result: ' + fns[op](a, b);
  } catch (e) {
    document.getElementById('result').textContent = 'Error: ' + e.message;
  }
}