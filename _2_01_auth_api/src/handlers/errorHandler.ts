import { Response } from 'express';
import * as Yup from "yup";

export const errorHandler = (res: Response, error: unknown) => {
    if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = (error as { message: string }).message;
        const statusCode = (error as { statusCode?: number }).statusCode;
        if (statusCode === 409) {
            res.status(409).send({ success: false, error: message });
        } else {
            res.status(statusCode || 500).send({ success: false, message });
        }
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