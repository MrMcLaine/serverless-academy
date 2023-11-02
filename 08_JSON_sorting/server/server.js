import express from 'express';
import { responses } from './data/responses.js';

const app = express();
const PORT = 4000;

app.get('/json-:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (id && id <= responses.length) {
        res.json(responses[id - 1]);
    } else {
        res.status(404).send('Not Found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});