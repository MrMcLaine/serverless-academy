import express from 'express';
import dotenv from "dotenv";
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server is running -> http://localhost:3000');
});