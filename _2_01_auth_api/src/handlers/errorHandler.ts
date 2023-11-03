import { Response } from 'express';
import * as Yup from "yup";

export const errorHandler = (res: Response, error: unknown) => {
    if (typeof error === 'object' && error !== null && 'message' in error) {
        res.status(500).send({ success: false, message: (error as { message: string }).message });
    } else {
        res.status(500).send({ success: false, message: 'An unknown error occurred' });
    }
};

export const errorYupHandler = (error: unknown) => {
    if (error instanceof Yup.ValidationError) {
        throw new Error(error.message);
    } else {
        throw new Error('An unknown error occurred during validation.');
    }
}