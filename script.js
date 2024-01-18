const apiAccuWeatherKey = 'f3xnRLADXhGfTHIfGcmPSScvyEBCFuzU';
const apiOpenWeatherKey = '30b3e480af39c5c8a31c53584f1bdd67'
const form = document.querySelector('.get-weather-form');
const wrapper = document.querySelector('.getweather__wrapper');
const inputForm = document.querySelector('.form__input');



form.addEventListener('submit', async e => {
	e.preventDefault();
	let city = inputForm.value.toLowerCase();
	inputForm.value = '';
	if (city != '') {
		clearCard();
		let weatherInfo = await getFetch(city);
		displayWeatherInfo(weatherInfo);
	} else {
		displayError('Please enter a city');
	}
});


async function getFetch(city) {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30b3e480af39c5c8a31c53584f1bdd67`
	const response = await fetch(apiUrl);

	if (!response.ok) {
		displayError('Could not fetch data');
		throw new Error('Could not fetch data');
	}

	const weather = await response.json();
	return weather;
}

function displayWeatherInfo(data) {
	const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
	console.log('city, main, weather :>> ', city, temp, humidity, description, id);
	const card = document.createElement('div');
	const cardCity = document.createElement('h2');
	const cardTemperature = document.createElement('p');
	const cardHumidity = document.createElement('p');
	const cardSky = document.createElement('p');
	const cardEmoji = document.createElement('p');

	const celsiusTemp = (temp - 274.55).toFixed(1);

	card.classList.add('weather-card');
	cardCity.classList.add('card__city');
	cardTemperature.classList.add('card__temperature');
	cardHumidity.classList.add('card__humidity');
	cardSky.classList.add('card__sky');
	cardEmoji.classList.add('card__emoji');

	cardCity.textContent = city;
	cardTemperature.textContent = `${celsiusTemp}°C`;
	cardHumidity.textContent = `Humidity ${humidity}%`;
	cardSky.textContent = description;
	cardEmoji.textContent = getEmoji(id);

	card.appendChild(cardCity);
	card.appendChild(cardTemperature);
	card.appendChild(cardHumidity);
	card.appendChild(cardSky);
	card.appendChild(cardEmoji);

	wrapper.appendChild(card);

}

function displayError(message) {
	clearCard();
	const card = document.createElement('div');
	const cardError = document.createElement('p');

	card.classList.add('weather-card');
	cardError.classList.add('card__error')
	cardError.textContent = message;
	card.appendChild(cardError);
	wrapper.appendChild(card);
}

function clearCard() {
	const weatherCard = document.querySelector('.weather-card');
	if (weatherCard) weatherCard.remove();
}

function getEmoji(weatherId) {
	switch (true) {
		case (200 <= weatherId < 300):
			return `⛈`;
		case (300 <= weatherId < 400):
			return '🌧';
		case (500 <= weatherId < 600):
			return '🌧';
		case (600 <= weatherId < 700):
			return '❄';
		case (700 <= weatherId < 800):
			return '🌫';
		case (weatherId == 800):
			return '☀';
		case (801 <= weatherId <= 804):
			return '☁';
		default:
			return '❓';
	}
}