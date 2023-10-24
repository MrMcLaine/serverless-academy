import TelegramBot from "node-telegram-bot-api";
import { loadEnvVariables } from "./loadEnvVariables.js";
import { getForecast } from "./fetchService.js";

loadEnvVariables();

const BOT_TOKEN_TG = process.env.BOT_TOKEN_TG;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const CITY = 'Cherkasy';
const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${WEATHER_API_KEY}`;

function initProgram() {
    const bot = new TelegramBot(BOT_TOKEN_TG, {polling: true})

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, `Forecast in ${CITY}`, {
            reply_markup: {
                inline_keyboard: [[{
                    text: "Choose interval",
                    callback_data: 'choose_interval'
                }]]
            }
        });
    });

    bot.on('callback_query', async (callbackQuery) => {
        const message = callbackQuery.message;
        if (callbackQuery.data === 'choose_interval') {
            await bot.sendMessage(message.chat.id, 'Select an interval:', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "3 hours", callback_data: '3_hours'}],
                        [{text: "6 hours", callback_data: '6_hours'}]
                    ]
                }
            });
        } else {
            const hours = callbackQuery.data === '3_hours' ? 3 : 6;
            const weatherData = await getForecast(hours, CITY, API_ENDPOINT);
            await bot.sendMessage(message.chat.id, weatherData);
        }
    });
}

initProgram();

