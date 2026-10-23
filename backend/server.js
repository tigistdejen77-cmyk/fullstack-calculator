const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    
    let result;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: 'እባክዎ ትክክለኛ ቁጥሮችን ያስገቡ!' });
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
                return res.status(400).json({ error: 'ማካፈል በ0 አይቻልም!' });
            }
            result = n1 / n2;
            break;
        default:
            return res.status(400).json({ error: 'ትክክለኛ ያልሆነ ስራ (Operation) ነው!' });
    }

    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`ሰርቨሩ በፖርት ${PORT} ላይ በትክክል እየሰራ ነው...`);
});