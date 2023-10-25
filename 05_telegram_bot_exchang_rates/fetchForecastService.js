import axios from "axios";

export async function getForecast(interval, CITY, API_ENDPOINT) {
    try {
        const response = await axios.get(API_ENDPOINT);
        const list = response.data.list;

        return generateForecastMessage(list, interval, CITY, currentElement => {
            const date = new Date(currentElement.dt_txt).toLocaleString();
            const temp = currentElement.main.temp - 273.15;
            const description = currentElement.weather[0].description;

            return `${date}: ${temp.toFixed(2)}°C, ${description}\n\n`;
        });
    } catch (error) {
        console.error(error);
        return 'Error fetching weather data. Please try again.';
    }
}

export async function getWindSpeedOnlyForecast(interval, CITY, API_ENDPOINT) {
    try {
        const response = await axios.get(API_ENDPOINT);
        const list = response.data.list;

        return generateForecastMessage(list, interval, CITY, currentElement => {
            const date = new Date(currentElement.dt_txt).toLocaleString();
            const windSpeed = currentElement.wind.speed;
            return `${date}:wind speed - ${windSpeed }\n\n`;
        });
    } catch (error) {
        console.error(error);
        return 'Error fetching weather data. Please try again.';
    }
}

function generateForecastMessage(list, interval, CITY, formatter) {
    let message = `The forecast for every ${interval} hours in ${CITY}:\n\n`;
    for (let i = 0; i < list.length; i += interval / 3) {
        message += formatter(list[i]);
    }

    return message;
}