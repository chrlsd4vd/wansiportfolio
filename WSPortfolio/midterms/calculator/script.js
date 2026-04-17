let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

const displayElement = document.getElementById('display');

function updateDisplay() {
    let displayValue = currentInput;
    if (displayValue.length > 12) {
        displayValue = displayValue.substring(0, 12);
    }
    displayElement.textContent = displayValue;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (shouldResetDisplay) return;
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else if (shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate(false);
    } else {
        previousInput = currentInput;
    }
    operator = op;
    shouldResetDisplay = true;
}

function calculate(final = true) {
    if (operator === null || shouldResetDisplay) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }
    
    if (result === 'Error') {
        currentInput = 'Error';
        operator = null;
        previousInput = '';
        shouldResetDisplay = true;
    } else {
        result = Math.round(result * 1000000000) / 1000000000;
        currentInput = result.toString();
        if (final) {
            operator = null;
            previousInput = '';
        } else {
            previousInput = currentInput;
        }
        shouldResetDisplay = true;
    }
    
    updateDisplay();
}
