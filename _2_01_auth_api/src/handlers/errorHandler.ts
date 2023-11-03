import { Response } from 'express';

export const errorHandler = (res: Response, error: unknown) => {
    if (typeof error === 'object' && error !== null && 'message' in error) {
        res.status(500).send({ success: false, message: (error as { message: string }).message });
    } else {
        res.status(500).send({ success: false, message: 'An unknown error occurred' });
    }
};