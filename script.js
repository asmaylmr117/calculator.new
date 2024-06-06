// Select elements
const display = document.getElementById('display');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const clearButton = document.getElementById('clear');

// Initialize variables
let previousNumber = '';
let currentNumber = '';
let operation = undefined;

// Add event listeners to number buttons
numbers.forEach(number => {
    number.addEventListener('click', () => {
        appendNumber(number.innerText);
        updateDisplay();
    });
});

// Add event listeners to operation buttons
operations.forEach(op => {
    op.addEventListener('click', () => {
        chooseOperation(op.innerText);
        
    });
});

// Add event listener to clear button
clearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

// Define functions for calculator operations
function appendNumber(number) {
    if (number === '.' && currentNumber.includes('.')) return;
    currentNumber += number;
}

function chooseOperation(selectedOperation) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        compute();
    }
    operation = selectedOperation;
    previousNumber = currentNumber;
    currentNumber = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
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
        case '/':
            if (current === 0) {
                computation = 'error';
            } else {
                computation = prev / current;
            }
            break;
        case '=':
            computation = current;
            break;
        default:
            return;
    }
    currentNumber = computation.toString();
    operation = undefined;
    previousNumber = '';
    updateDisplay();
}

function clear() {
    previousNumber = '';
    currentNumber = '';
    operation = undefined;
}

function updateDisplay() {
    let displayValue = '';
    if (previousNumber !== '') {
        displayValue += previousNumber;
        if (operation) {
            displayValue += ' ' + operation;
        }
    }
    if (currentNumber !== '') {
        displayValue += ' ' + currentNumber;
    }
    display.value = displayValue.trim();
}