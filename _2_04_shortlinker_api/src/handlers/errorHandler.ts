import { Response } from 'express';

export const errorHandler = (res: Response, error: unknown) => {
    if (error instanceof Error) {
        res.status(404).send(error.message);
    } else {
        res.status(500).send('An unknown error occurred');
    }
};