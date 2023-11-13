import {addFavoriteCityOnPage, replaceMainCityOnPage, SERVER_WEATHER_URL, SERVER_FORECAST_URL, API_KEY} from './weather.js';

const favoriteCitiesSet = new Set();
if (!localStorage.getItem('favoriteCities')) {
    const favoriteCitiesArray = Array.from(favoriteCitiesSet);
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCitiesArray));
}

function renderFavoriteCities() {
    /**
     *   Не знаю норм ли делать так, просто если я тупо выведу все города, то те,
     *  которые уже были на странице, остануться и получится что они просто
     *  дублируются. Поэтому придумал просто отчищать страницу
     *   А так как я делал в тудушке, задавал какой-то модификатор
     *  типа есть ли элемент на странице и проверял было впадлу))
     */
    const favoriteList = document.querySelector('.weather-favorite__list');
    favoriteList.innerHTML = '';

    const favoriteCitiesArray = JSON.parse(localStorage.getItem('favoriteCities'));
    for(const city of favoriteCitiesArray) {
        addFavoriteCityOnPage(city);
    }
}

export function addFavoriteCityAtStorage(cityName) {  // следующие два метода почти одинкаовые, я думал думал, как то мб вынести в отдельную функцию
    const favoriteCitiesArray = JSON.parse(localStorage.getItem('favoriteCities'));  // но чет решил в итоге так не делать
    const favoriteCitiesSet = new Set(favoriteCitiesArray);

    favoriteCitiesSet.add(cityName);

    const updatedFavoriteCitiesArray = Array.from(favoriteCitiesSet);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavoriteCitiesArray));

    renderFavoriteCities();
}

export function deleteFavoriteCityFromStorage(cityName) {
    const favoriteCitiesArray = JSON.parse(localStorage.getItem('favoriteCities'));
    const favoriteCitiesSet = new Set(favoriteCitiesArray);

    favoriteCitiesSet.delete(cityName);

    const updatedFavoriteCitiesArray = Array.from(favoriteCitiesSet);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavoriteCitiesArray));

    renderFavoriteCities();
}

export function addMainCityAtStorage(cityName) {
    localStorage.setItem('mainCity', cityName);
}

document.addEventListener('DOMContentLoaded', () => {
    renderFavoriteCities();

    const mainCityName = localStorage.getItem('mainCity');
    const weatherUrl = `${SERVER_WEATHER_URL}?q=${mainCityName}&appid=${API_KEY}`;
    const forecastUrl = `${SERVER_FORECAST_URL}?q=${mainCityName}&appid=${API_KEY}`;

    replaceMainCityOnPage(weatherUrl, forecastUrl);
});