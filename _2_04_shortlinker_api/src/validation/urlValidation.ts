import * as yup from 'yup';

const urlSchema = yup.object().shape({
    url: yup.string().url().required('URL is required'),
});

export const validateUrl = async (url: string) => {
    try {
        await urlSchema.validate({ url });
        return true;
    } catch (error) {
        return false;
    }
};
