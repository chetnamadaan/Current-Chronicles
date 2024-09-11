
document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = null;
    let firstOperand = null;
    let memory = 0;

    document.querySelectorAll('.btn').forEach(function (button) {
        button.addEventListener('click', function () {
            const value = this.dataset.num || this.dataset.operator;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                display.textContent = currentInput;
            } else if (this.id === 'clear') {
                clearAll();
            } else if (this.id === 'backspace') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else if (this.id === 'sqrt') {
                currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                display.textContent = currentInput;
            } else if (this.id === 'power') {
                currentInput = Math.pow(parseFloat(currentInput), 2).toString();
                display.textContent = currentInput;
            } else if (value === '=') {
                if (operator && firstOperand !== null && currentInput !== '') {
                    const secondOperand = parseFloat(currentInput);
                    currentInput = calculate(firstOperand, secondOperand, operator).toString();
                    display.textContent = currentInput;
                    firstOperand = null;
                    operator = null;
                }
            } else if (value === '+' || value === '-' || value === '*' || value === '/') {
                if (currentInput !== '') {
                    if (firstOperand === null) {
                        firstOperand = parseFloat(currentInput);
                    } else {
                        firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
                    }
                    operator = value;
                    currentInput = '';
                }
            }

            if (this.id === 'memory-add') {
                memory += parseFloat(display.textContent);
            } else if (this.id === 'memory-subtract') {
                memory -= parseFloat(display.textContent);
            } else if (this.id === 'memory-recall') {
                display.textContent = memory.toString();
                currentInput = memory.toString();
            } else if (this.id === 'memory-clear') {
                memory = 0;
            }
        });
    });

    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    function clearAll() {
        currentInput = '';
        firstOperand = null;
        operator = null;
        display.textContent = '0';
    }
});
