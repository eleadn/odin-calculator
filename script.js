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

let operation = new Operation(3, "+", 5);

operate(operation);

console.log(operation.result);