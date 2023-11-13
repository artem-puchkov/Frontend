import {addFavoriteCityAtStorage, addMainCityAtStorage, deleteFavoriteCityFromStorage} from './storage.js';

export const SERVER_WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';
export const SERVER_FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast'
export const API_KEY = '47a3dcf8a72f7ba52873a16329f6a540';

const searchCityForm = document.getElementById('searchCity');
const favoriteButton = document.querySelector('.weather-info__btn');

export function replaceMainCityOnPage(weatherUrl, forecastUrl) {
    fetch(weatherUrl)
    .then(response => {
        if (response.status === 404) {
            throw new Error('There\'s no such city');
        }

        return response.json();
    })
    .then(data => {
        const nameOfCity = data.name; 
        const currentTemperature = data.main.temp; 
        const feelsTemperature = data.main.feels_like;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        
        replaceMainText(nameOfCity, currentTemperature, feelsTemperature, sunrise, sunset);
    })
    .catch(error => {
        console.error(error);
    });

    fetch(forecastUrl)
    .then(response => {
        if (response.status === 404) {
            throw new Error('There\'s no such city');
        }

        return response.json();
    })
    .then(data => {
        const hoursList = data.list.slice(1, 4);
        
        replaceForecastText(hoursList);
    });
}

function replaceMainText(cityName, temp, feelsTemp, sunrise, sunset) {
    const paragraphContent = document.querySelector('.weather-info__city');
    paragraphContent.textContent = cityName;

    const temperature = document.querySelector('.weather-info__degree');
    temperature.textContent = Math.round(temp - 273.15) + '°';

    const feelsTemperature = document.querySelector('.weather-info__feels');
    feelsTemperature.textContent = `Feels like: ${Math.round(feelsTemp - 273.15)}°`;

    const date = new Date(sunrise * 1000);
    const sunriseParagraph = document.querySelector('.weather-info__sunrise');
    sunriseParagraph.textContent = 'Sunrise' + ': ' 
                                    + padZero(date.getHours()) + ':'
                                    + padZero(date.getMinutes());

    date.setTime(sunset * 1000);
    const sunsetParagraph = document.querySelector('.weather-info__sunset');
    sunsetParagraph.textContent = 'Sunset' + ': ' 
                                    + padZero(date.getHours()) + ':'
                                    + padZero(date.getMinutes());
}   

function replaceForecastText(hoursList) {
    const firstForecast = document.querySelector('.weather-info-hour1');
    const secondForecast = document.querySelector('.weather-info-hour2');
    const thirdForecast = document.querySelector('.weather-info-hour3');

    replaceText(firstForecast, hoursList[0]);
    replaceText(secondForecast, hoursList[1]);
    replaceText(thirdForecast, hoursList[2]);

    function replaceText(forecastBlock, forecastData) {
        const time = forecastBlock.querySelector('.weather-info-hour__time');
        const temperature = forecastBlock.querySelector('.weather-info-hour__temp');
        const feelsTemperature = forecastBlock.querySelector('.weather-info-hour__feels');
        const weatherImage = forecastBlock.querySelector('.weather-info-hour__image');

        const date = new Date(forecastData.dt_txt);
        time.textContent = padZero(date.getHours()) + ':' + padZero(date.getMinutes());

        temperature.textContent = `Temperature: ${Math.round(forecastData.main.temp - 273.15)}°`;

        feelsTemperature.textContent = `Feels like: ${Math.round(forecastData.main.feels_like - 273.15)}° `;

        if (forecastData.weather[0].main === 'Rain') {
            weatherImage.setAttribute('src', 'images/rain.svg');
        } else {
            weatherImage.setAttribute('src', 'images/cloud.svg');
        }
    }   
}

function padZero(num) {
    return (num < 10) ? '0' + num : num;
}

export function addFavoriteCityOnPage(cityName) {
    const list = document.querySelector('.weather-favorite__list');

    const item = document.createElement('div');
    item.setAttribute('class', 'weather-favorite__item');

    const city = document.createElement('button');
    city.setAttribute('class', 'weather-favorite__city');
    city.textContent = cityName;
    city.addEventListener('click', () => {
        const weatherUrl = `${SERVER_WEATHER_URL}?q=${cityName}&appid=${API_KEY}`;
        const forecastUrl = `${SERVER_FORECAST_URL}?q=${cityName}&appid=${API_KEY}`;

        replaceMainCityOnPage(weatherUrl, forecastUrl);
        addMainCityAtStorage(cityName);
    });

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'weather-favorite__delete');
    deleteButton.addEventListener('click', () => {
        deleteFavoriteCityFromStorage(cityName);
    });

    const deleteImage = document.createElement('img');
    deleteImage.setAttribute('src', 'images/delete.svg');
    deleteImage.setAttribute('class', 'weather-favorite__image');

    deleteButton.appendChild(deleteImage);

    item.appendChild(city);
    item.appendChild(deleteButton);

    list.appendChild(item);
}

searchCityForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const cityName = searchCityForm.elements['userInput'].value;
    searchCityForm.elements['userInput'].value = '';

    const weatherUrl = `${SERVER_WEATHER_URL}?q=${cityName}&appid=${API_KEY}`;
    const forecastUrl = `${SERVER_FORECAST_URL}?q=${cityName}&appid=${API_KEY}`;

    replaceMainCityOnPage(weatherUrl, forecastUrl);
    addMainCityAtStorage(cityName);
});

favoriteButton.addEventListener('click', function() {
    const paragraphContent = document.querySelector('.weather-info__city');
    const cityName = paragraphContent.textContent;

    addFavoriteCityAtStorage(cityName);
});