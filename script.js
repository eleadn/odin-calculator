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
    if (b === 0)
    {
        return "ERROR";
    }
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
    obj.submitted = false;
    return obj;
}

function resetOperation(operation)
{
    operation.leftOperand = null;
    operation.operator = null;
    operation.rightOperand = null;
    operation.result = null;
    operation.submitted = false;
}

function onNumberButtonClick(numberButton, operation, display, preview)
{
    if (operation.submitted)
    {
        preview.textContent = "";
        display.textContent = "";
        resetOperation(operation);
    }

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
    resetOperation(operation);
    display.textContent = "";
    preview.textContent = "";
}

function onOperatorClick(operatorButton, operation, display, preview)
{
    if (operation.leftOperand === null)
    {
        return;
    }

    if (operation.rightOperand !== null)
    {
        operate(operation);
        const result = operation.result;
        resetOperation(operation);
        operation.leftOperand = result;
    }

    operation.operator = operatorButton.textContent;
    preview.textContent = `${operation.leftOperand}${operation.operator}`;
    display.textContent = "";
}

function onSubmitClick(operation, display, preview)
{
    if (operation.leftOperand === null)
    {
        return;
    }
    else if (operation.rightOperand === null || operation.result !== null)
    {
        if (operation.result !== null)
        {
            const result = operation.result;
            resetOperation(operation);
            operation.leftOperand = result;
        }
        preview.textContent = `${operation.leftOperand}=`;
        display.textContent = `${operation.leftOperand}`;
    }
    else
    {
        operate(operation);
        preview.textContent = `${operation.leftOperand}${operation.operator}${operation.rightOperand}=`;
        display.textContent = operation.result;
    }

    operation.submitted = true;
}

const currentDisplay = document.querySelector(".current");
const previewDisplay = document.querySelector(".preview");
const clearButton = document.querySelector(".clear");
const submitButton = document.querySelector(".submit");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
let operation = new Operation();

numberButtons.forEach(numberButton => numberButton.addEventListener("click",
    context => onNumberButtonClick(context.target, operation, currentDisplay, previewDisplay)));
clearButton.addEventListener("click", () => onClearButtonClick(operation, currentDisplay, previewDisplay));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click",
    context => onOperatorClick(context.target, operation, currentDisplay, previewDisplay)));
submitButton.addEventListener("click", () => onSubmitClick(operation, currentDisplay, previewDisplay));