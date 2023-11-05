const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_!$&*';
const BASE = ALPHABET.length;

export const convertToBase62 = (id: string): string => {
    const shortId = id.slice(0, 8);
    let num = parseInt(shortId, 16);
    let encoded = '';

    while (num) {
        let remainder = num % BASE;
        num = Math.floor(num / BASE);
        encoded = ALPHABET.charAt(remainder) + encoded;
    }

    return encoded;
};