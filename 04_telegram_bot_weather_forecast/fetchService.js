import axios from "axios";

export async function getForecast(interval, CITY, API_ENDPOINT) {
    try {
        const response = await axios.get(API_ENDPOINT);
        const list = response.data.list;
        let message = 'The weather forecast for the every ' + interval + ' hours in ' + CITY + ' :\n\n';

        for (let i = 0; i < list.length; i += interval / 3) {
            const currentElement = list[i];
            const date = new Date(currentElement.dt_txt).toLocaleString();
            const temp = currentElement.main.temp - 273.15;
            const description = currentElement.weather[0].description;
            message += `${date}: ${temp.toFixed(2)}°C, ${description}\n\n`;
        }

        return message;
    } catch (error) {
        console.error(error);
        return 'Error fetching weather data. Please try again.';
    }
}