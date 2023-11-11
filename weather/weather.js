const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '47a3dcf8a72f7ba52873a16329f6a540';


const cityArray = ['Moscow', 'Prague']

function addToCitiArray(cityName) {
    cityArray.push(cityName);
}

for(city of cityArray) {
    addAtFavoriteList(city);
}


const searchCityForm = document.getElementById('searchCity');
const favoriteButton = document.querySelector('.weather-info__btn');

function replaceCityOnMain(url) {
    fetch(url)
    .then(response => {
        if (response.status === 404) {
            throw new Error('There\'s no such city');
        }

        return response.json();
    })
    .then(data => {
        const currentTemperature = data.main.temp; 
        const nameOfCity = data.name; 

        replaceText(nameOfCity, currentTemperature);
    })
    .catch(error => {
        console.error(error);
    });

    function replaceText(cityName, temp) {
        const paragraphContent = document.querySelector('.weather-info__city');
        paragraphContent.textContent = cityName;
    
        const temperature = document.querySelector('.weather-info__degree');
        temperature.textContent = Math.round(temp - 273.15) + '°';
    }
}

function addAtFavoriteList(cityName) {
    const list = document.querySelector('.weather-favorite__list');

    const elem = document.createElement('button');
    elem.setAttribute('class', 'weather-favorite__item');
    elem.textContent = cityName;
    elem.addEventListener('click', () => {
        const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;

        replaceCityOnMain(url);
    });

    list.appendChild(elem);
}

searchCityForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const cityName = searchCityForm.elements['userInput'].value;
    searchCityForm.elements['userInput'].value = '';

    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;

    replaceCityOnMain(url);
});

favoriteButton.addEventListener('click', function() {
    const paragraphContent = document.querySelector('.weather-info__city');
    const cityName = paragraphContent.textContent;

    addToCitiArray(cityName);
    addAtFavoriteList(cityName);
});