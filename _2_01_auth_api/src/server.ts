import express from 'express';
import usersRoutes from './routes/userRouter';

const app = express();

app.use(express.json());

app.use('/auth', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
