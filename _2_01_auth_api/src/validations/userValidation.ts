import * as Yup from 'yup';
import {errorYupHandler} from "../handlers/errorHandler";

const userSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(50, 'Password cannot be more than 50 characters long')
        .required('Password is required'),
});

const validateUser = async (userData: { email: string; password: string }) => {
    try {
        await userSchema.validate(userData);
    } catch (error) {
        errorYupHandler(error);
    }
};

export { validateUser };