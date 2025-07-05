let firstNumber = "";
let secondNumber = "";
let operator = null;
let displayValue = "";
let shouldResetDisplay = false;

const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".buttons button:not(.operator):not(.clear):not(.equal)");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal")
const clearButton = document.querySelector(".clear")

//Basic Math Functions
function add(a, b) {
    return a + b;
}
function multiply(a, b) {
    return a * b;
}
function subtract(a, b) {
    return a - b;
}
function divide(a, b) {
    return b === 0 ? "Error" : a / b;
}


//Operate function
function operate(op, a, b) {
    a = Number(a);
    b = Number(b);
    switch (op) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}

//Digital button logic
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (shouldResetDisplay) {
            displayValue = "";
            shouldResetDisplay = false;
        }
        displayValue += button.textContent;
        display.textContent = displayValue;
    });
});

//Operator button logic
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (operator !== null && !shouldResetDisplay) {
            secondNumber = displayValue;
            displayValue = operate(operator, firstNumber, secondNumber);
            display.textContent = displayValue;
        }
        firstNumber = displayValue;
        operator = button.textContent;
        shouldResetDisplay = true;
    });
});

//Equal button logic
equalButton.addEventListener("click", () => {
    if (operator === null || shouldResetDisplay) return;
    secondNumber = displayValue;
    const result = operate(operator, firstNumber, secondNumber);
    displayValue = formatResult(result);
    display.textContent = displayValue;
    operator = null;
    firstNumber = "";
    secondNumber = "";
    shouldResetDisplay = true;
});

//Clear button logic
clearButton.addEventListener("click", () => {
    displayValue = "";
    firstNumber = "";
    secondNumber = "";
    operator = null;
    shouldResetDisplay = false;
    display.textContent = "0";
});

//Changes
function formatResult(result) {
  if (typeof result === "string") return result; // e.g. "Error"
  if (Number.isInteger(result)) return result.toString();
  return parseFloat(result.toFixed(8)).toString(); // trim to 8 decimals
}
