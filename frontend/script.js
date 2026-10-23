async function calculate() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const operation = document.getElementById('operation').value;
    const resultElement = document.getElementById('result');

    if (num1 === '' || num2 === '') {
        alert('Please enter both numbers!');
        return;
    }

    try {
        // Sending data to our backend server API
        const response = await fetch('http://localhost:5000/api/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ num1, num2, operation })
        });

        const data = await response.json();

        if (response.ok) {
            resultElement.innerText = data.result;
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        alert('Could not reach the server! Please make sure the backend server is running.');
    }
}