import React, { useState } from 'react';
import './Calculator.css'; // Import the styles

const Calculator = () => {
  const [currentOperand, setCurrentOperand] = useState('');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState(undefined);

  // Clear all
  const clear = () => {
    setCurrentOperand('');
    setPreviousOperand('');
    setOperation(undefined);
  };

  // Delete last character
  const deleteLast = () => {
    setCurrentOperand((prev) => prev.slice(0, -1));
  };

  // Append number to current operand
  const appendNumber = (number) => {
    if (number === '.' && currentOperand.includes('.')) return;
    setCurrentOperand((prev) => prev + number.toString());
  };

  // Choose operation (+, -, *, ÷)
  const chooseOperation = (operation) => {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
      compute();
    }
    setOperation(operation);
    setPreviousOperand(currentOperand);
    setCurrentOperand('');
  };

  // Perform computation
  const compute = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    setCurrentOperand(computation);
    setOperation(undefined);
    setPreviousOperand('');
  };

  // Format the display number
  const getDisplayNumber = (number) => {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {operation && `${getDisplayNumber(previousOperand)} ${operation}`}
        </div>
        <div className="current-operand">
          {getDisplayNumber(currentOperand)}
        </div>
      </div>

      {/* Calculator buttons */}
      <button onClick={clear} className="span-two">AC</button>
      <button onClick={deleteLast}>DEL</button>
      <button onClick={() => chooseOperation('÷')}>÷</button>
      <button onClick={() => appendNumber('1')}>1</button>
      <button onClick={() => appendNumber('2')}>2</button>
      <button onClick={() => appendNumber('3')}>3</button>
      <button onClick={() => chooseOperation('*')}>*</button>
      <button onClick={() => appendNumber('4')}>4</button>
      <button onClick={() => appendNumber('5')}>5</button>
      <button onClick={() => appendNumber('6')}>6</button>
      <button onClick={() => chooseOperation('+')}>+</button>
      <button onClick={() => appendNumber('7')}>7</button>
      <button onClick={() => appendNumber('8')}>8</button>
      <button onClick={() => appendNumber('9')}>9</button>
      <button onClick={() => chooseOperation('-')}>-</button>
      <button onClick={() => appendNumber('.')}>.</button>
      <button onClick={() => appendNumber('0')}>0</button>
      <button onClick={compute} className="span-two">=</button>
    </div>
  );
};

export default Calculator;
