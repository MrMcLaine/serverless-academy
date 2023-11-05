import express from 'express';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import connectDB from "./libs/db";
import jsonRouter from './routes/jsonRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

app.use('/', jsonRouter);

app.listen(3000, () => {
    console.log('Server is running -> http://localhost:3000');
});