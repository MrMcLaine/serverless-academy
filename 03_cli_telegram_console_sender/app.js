import TelegramBot from "node-telegram-bot-api";
import { Command } from "commander";
import { loadEnvVariables } from "./loadEnvVariables.js";

loadEnvVariables();

const BOT_TOKEN_TG = process.env.BOT_TOKEN_TG;
const CHAT_ID_TG = process.env.CHAT_ID_TG;

function initProgram() {
    const bot = new TelegramBot(BOT_TOKEN_TG, {polling: true});

    const app = new Command();

    app
        .command('send-message <message>')
        .alias('m')
        .description('Send a message to your Telegram bot.')
        .action(async (message) => {
            try {
                await bot.sendMessage(CHAT_ID_TG, message);
                console.log('Message sent successfully.');
            } catch (error) {
                console.error('Failed to send message:', error.message);
            }
            process.exit();
        });

    app
        .command('send-photo <path>')
        .alias('p')
        .description('Send a photo to your Telegram bot.')
        .action(async (path) => {
            try {
                await bot.sendPhoto(CHAT_ID_TG, path);
                console.log('Photo sent successfully.');
            } catch (error) {
                console.error('Failed to send photo:', error.message);
            }
            process.exit();
        });

    app.parse(process.argv);

    if (process.argv.length <= 2) {
        app.outputHelp();
    }
}

initProgram();