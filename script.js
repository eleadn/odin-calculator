function add(a, b)
{
    return a + b;
}

function substract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    return a / b;
}

function operate(operation)
{
    switch (operation.operator)
    {
        case "+":
            operation.result = add(operation.leftOperand, operation.rightOperand);
            break;
        case "-":
            operation.result = substract(operation.leftOperand, operation.rightOperand);
            break;
        case "x":
            operation.result = multiply(operation.leftOperand, operation.rightOperand);
            break;
        case "/":
            operation.result = divide(operation.leftOperand, operation.rightOperand);
            break
        default:
            operation.result = "ERROR";
            break;
    }
}

function Operation(leftOperand = null, operator = null, rightOperand = null)
{
    const obj = {};
    obj.leftOperand = leftOperand;
    obj.operator = operator;
    obj.rightOperand = rightOperand;
    obj.result = null;
    return obj;
}

function onNumberButtonClick(numberButton, operation, display)
{
    if (display.textContent.length < 9)
    {
        display.textContent += numberButton.textContent;
    }

    if (operation.operator === null)
    {
        operation.leftOperand = Number.parseInt(display.textContent);
    }
    else
    {
        operation.rightOperand = Number.parseInt(display.textContent);
    }
}

function onClearButtonClick(operation, display, preview)
{
    operation.leftOperand = null;
    operation.operator = null;
    operation.rightOperand = null;
    operation.result = null;
    display.textContent = "";
    preview.textContent = "";
}

function onOperatorClick(operatorButton, operation, display, preview)
{
    if (operation.leftOperand === null)
    {
        return;
    }

    operation.operator = operatorButton.textContent;
    preview.textContent = `${operation.leftOperand}${operation.operator}`;
    display.textContent = "";
}

function onSubmitClick(operation, display, preview)
{
    operate(operation);
    preview.textContent = `${operation.leftOperand}${operation.operator}${operation.rightOperand}=`;
    display.textContent = operation.result;
}

const currentDisplay = document.querySelector(".current");
const previewDisplay = document.querySelector(".preview");
const clearButton = document.querySelector(".clear");
const submitButton = document.querySelector(".submit");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
let operation = new Operation();

numberButtons.forEach(numberButton => numberButton.addEventListener("click",
    context => onNumberButtonClick(context.target, operation, currentDisplay)));
clearButton.addEventListener("click", () => onClearButtonClick(operation, currentDisplay, previewDisplay));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click",
    context => onOperatorClick(context.target, operation, currentDisplay, previewDisplay)));
submitButton.addEventListener("click", () => onSubmitClick(operation, currentDisplay, previewDisplay));