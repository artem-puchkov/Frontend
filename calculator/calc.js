const equal = document.getElementById('equal');

function counting() {
    const firstArg = Number(document.getElementById("firstInput").value);
    const secondArg = Number(document.getElementById("secondInput").value);
    const sign = document.getElementById("select").value;

    switch(sign) {
        case "+":
            operation(firstArg + secondArg)
            break;
        case "-":
            operation(firstArg - secondArg);
            break;
        case "*":
            operation(firstArg * secondArg);
            break;
        case "/":
            operation(firstArg / secondArg);
    }

    function operation(num) {
        document.getElementById("result").textContent = num;
        resultRecording(num)
    }

    function resultRecording(result) {
        const container = document.querySelector('.container');
        const elem = document.createElement('p');
        elem.addEventListener('click', () => {
            elem.remove();
        });

        elem.textContent = result;
        container.appendChild(elem);
    }
}

equal.addEventListener('click', counting);