export const WELCOME_MESSAGE = "Welcome";
export const WEATHER = "/погода";
export const CURRENCY = "/курс валют";
export const FORECAST_MESSAGE = `Forecast in `;
export const EVERY_3_HOURS = "Кожні 3 години";
export const EVERY_6_HOURS = "Кожні 6 години";
export const WIND = "Вітер";
export const PREVIOUS_MENU = "Попередне меню";
export const CURRENCY_MESSAGE = `Курс валют`;
export const USD = "USD";
export const EUR = "EUR";

export const WEATHER_REGEXP = new RegExp(`${WEATHER}`);
export const CURRENCY_REGEXP = new RegExp(`${CURRENCY}`);
export const WEATHER_COMMAND_REGEXP = new RegExp(`(${EVERY_3_HOURS}|${EVERY_6_HOURS}|${WIND}|${PREVIOUS_MENU})`);
export const CURRENCY_COMMAND_REGEXP = new RegExp(`(${USD}|${EUR})`);