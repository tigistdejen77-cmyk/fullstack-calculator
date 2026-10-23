const express = require('express');
const cors = require('cors'); // CORS ን መጥራት
const app = express();
const PORT = process.env.PORT || 5000;

// CORS ን ማንቃት
app.use(cors());

app.use(express.json());

// የሂሳብ ስራውን የምንሰራበት API
app.post('/api/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let result;

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: 'Please provide valid numbers' });
    }

    switch (operation) {
        case 'add':
            result = n1 + n2;
            break;
        case 'subtract':
            result = n1 - n2;
            break;
        case 'multiply':
            result = n1 * n2;
            break;
        case 'divide':
            if (n2 === 0) {
                return res.status(400).json({ error: 'Cannot divide by zero' });
            }
            result = n1 / n2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`ሰርቨሩ በፖርት ${PORT} ላይ በትክክል እየሰራ ነው...`);
});