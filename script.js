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
    obj.operatorChanged = false;
    return obj;
}

function resetOperation(operation)
{
    operation.leftOperand = 0;
    operation.operator = null;
    operation.rightOperand = null;
    operation.result = null;
    operation.submitted = false;
    operation.operatorChanged = false;
}

function onNumberButtonClick(numberButton, operation, display, preview)
{
    if (operation.submitted || operation.operatorChanged)
    {
        if (operation.submitted)
        {
            preview.textContent = "";
            resetOperation(operation);
        }
        display.textContent = "0";
        operation.operatorChanged = false;
    }

    if (display.textContent === "0")
    {
        display.textContent = numberButton.textContent;
    }
    else if (display.textContent.length < 9)
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
    display.textContent = "0";
    preview.textContent = "";
}

function onOperatorClick(operatorButton, operation, display, preview)
{
    if (operation.rightOperand !== null && !operation.operatorChanged)
    {
        operate(operation);
        const result = operation.result;
        resetOperation(operation);
        operation.leftOperand = result;
        display.textContent = operation.leftOperand;
    }

    operation.operator = operatorButton.textContent;
    preview.textContent = `${operation.leftOperand}${operation.operator}`;
    operation.rightOperand = Number.parseInt(display.textContent);
    operation.operatorChanged = true;
}

function onSubmitClick(operation, display, preview)
{
    if (operation.rightOperand === null || operation.result !== null)
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

function onDeleteClick(operation, display)
{
    if (operation.submitted || operation.operatorChanged)
    {
        return;
    }

    if (display.textContent.length === 1)
    {
        display.textContent = "0";
    }
    else
    {
        display.textContent = display.textContent.slice(0, display.textContent.length - 1);
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

const currentDisplay = document.querySelector(".current");
const previewDisplay = document.querySelector(".preview");
const clearButton = document.querySelector(".clear");
const submitButton = document.querySelector(".submit");
const deleteButton = document.querySelector(".delete");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
let operation = new Operation(0);

numberButtons.forEach(numberButton => numberButton.addEventListener("click",
    context => onNumberButtonClick(context.target, operation, currentDisplay, previewDisplay)));
clearButton.addEventListener("click", () => onClearButtonClick(operation, currentDisplay, previewDisplay));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click",
    context => onOperatorClick(context.target, operation, currentDisplay, previewDisplay)));
submitButton.addEventListener("click", () => onSubmitClick(operation, currentDisplay, previewDisplay));
deleteButton.addEventListener("click", () => onDeleteClick(operation, currentDisplay));