import TelegramBot from "node-telegram-bot-api";
import { loadEnvVariables } from "./loadEnvVariables.js";
import { getForecast, getWindSpeedOnlyForecast } from "./fetchForecastService.js";
import { getExchangeRateEUR, getExchangeRateUSD } from "./fetchExchangeRateService.js";
import {
    CURRENCY, CURRENCY_COMMAND_REGEXP, CURRENCY_MESSAGE, CURRENCY_REGEXP, EUR,
    EVERY_3_HOURS,
    EVERY_6_HOURS,
    FORECAST_MESSAGE,
    PREVIOUS_MENU, USD,
    WEATHER, WEATHER_COMMAND_REGEXP, WEATHER_REGEXP,
    WELCOME_MESSAGE,
    WIND
} from "./textData.js";

loadEnvVariables();

const BOT_TOKEN_TG = process.env.BOT_TOKEN_TG;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const CITY = 'Cherkasy';
const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${WEATHER_API_KEY}`;

function initProgram() {
    const bot = new TelegramBot(BOT_TOKEN_TG, {polling: true})

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        sendWelcomeMessage(bot, chatId);
    });

    bot.onText(WEATHER_REGEXP, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, FORECAST_MESSAGE + `${CITY}`, {
            reply_markup: {
                keyboard: [
                    [{text: EVERY_3_HOURS}, {text: EVERY_6_HOURS}],
                    [{text: WIND}],
                    [{text: PREVIOUS_MENU}],
                ]
            }
        });
    });

    bot.onText(CURRENCY_REGEXP, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, CURRENCY_MESSAGE, {
            reply_markup: {
                keyboard: [
                    [{text: USD}, {text: EUR}],
                    [{text: PREVIOUS_MENU}],
                ]
            }
        });
    });

    bot.onText(WEATHER_COMMAND_REGEXP, async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        switch (text) {
            case EVERY_3_HOURS:
                const weatherData = await getForecast(3, CITY, API_ENDPOINT);
                await bot.sendMessage(chatId, weatherData);
                break;
            case EVERY_6_HOURS:
                const weatherData2 = await getForecast(6, CITY, API_ENDPOINT);
                await bot.sendMessage(chatId, weatherData2);
                break;
            case WIND:
                const weatherData3 = await getWindSpeedOnlyForecast(6, CITY, API_ENDPOINT);
                await bot.sendMessage(chatId, weatherData3);
                break;
            case PREVIOUS_MENU:
                sendWelcomeMessage(bot, chatId);
                break;
        }
    });

    bot.onText(CURRENCY_COMMAND_REGEXP, async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        switch (text) {
            case USD:
                const currencyUSD = await getExchangeRateUSD();
                await bot.sendMessage(chatId, currencyUSD);
                break;
            case EUR:
                const currencyEUR = await getExchangeRateEUR();
                await bot.sendMessage(chatId, currencyEUR);
                break;
            case PREVIOUS_MENU:
                sendWelcomeMessage(bot, chatId);
                break;
        }
    })
}

function sendWelcomeMessage(bot, chatId) {
    bot.sendMessage(chatId, WELCOME_MESSAGE, {
        reply_markup: {
            keyboard: [
                [WEATHER],
                [CURRENCY]
            ]
        }
    });
}

initProgram();

