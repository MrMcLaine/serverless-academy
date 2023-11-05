const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_!$&*';
const BASE = ALPHABET.length;

export const convertToBase62 = (url: string): string => {
    const path = new URL(url).pathname + new URL(url).search;

    const randomChars = selectRandomChars(path, 3);
    let num = 0;

    for (let char of randomChars) {
        num = num * BASE + ALPHABET.indexOf(char);
    }

    num += Math.pow(BASE, 5);

    let encoded = '';
    while (num) {
        let remainder = num % BASE;
        num = Math.floor(num / BASE);
        encoded = ALPHABET.charAt(remainder) + encoded;
    }

    return encoded.slice(-5);
};

const selectRandomChars = (str: string, count: number): string => {
    let result = '';
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * str.length);
        result += str[randomIndex];
    }
    return result;
};