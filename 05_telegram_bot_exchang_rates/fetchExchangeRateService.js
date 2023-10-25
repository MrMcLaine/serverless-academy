import NodeCache from 'node-cache';

const MONOBANK_API_URL = 'https://api.monobank.ua/bank/currency';
const PRIVATBANK_API_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

const MONOBANK_CURRENCY_CODE = {
    USD: 840,
    EUR: 978,
    UA: 980
}

const cache = new NodeCache({ stdTTL: 60 });

async function getExchangeRates(currency) {
    let monoData = cache.get(`mono${currency}`);

    if (!monoData) {
        const response = await fetch(MONOBANK_API_URL);
        const monoResponse = await response.json();

        monoData = monoResponse.find(entry =>
            entry.currencyCodeA === MONOBANK_CURRENCY_CODE[currency]
            && entry.currencyCodeB === MONOBANK_CURRENCY_CODE.UA);
        cache.set(`mono${currency}`, monoData);
    }

    const privatResponse = await fetch(PRIVATBANK_API_URL);
    const privatResponseJSON = await privatResponse.json();
    const privatData = privatResponseJSON.find(entry => entry.ccy === currency);

    if (!monoData || !privatData) {
        return 'Error fetching exchange rates. Please try again.';
    }

    const monobankFormatted = `Курс покупка: ${monoData.rateBuy.toFixed(2)} 
    / продаж: ${monoData.rateSell.toFixed(2)} ${currency} Monobank`;
    const privatbankFormatted = `Курс покупка: ${parseFloat(privatData.buy).toFixed(2)} 
    / продаж: ${parseFloat(privatData.sale).toFixed(2)} ${currency} PrivatBank`;

    return monobankFormatted + '\n' + privatbankFormatted;
}

export const getExchangeRateUSD = async () => getExchangeRates('USD');
export const getExchangeRateEUR = async () => getExchangeRates('EUR');
