import express from 'express';
import bodyParser from 'body-parser';
import ipRoutes from "./ipRoutes";

const app = express();
app.use(bodyParser.json());

app.set('trust proxy', true);

app.get('/', ipRoutes);

app.listen(3000, () => {
    console.log('Server is running -> http://localhost:3000');
});