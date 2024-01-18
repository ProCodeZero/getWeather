const apiKey = 'f3xnRLADXhGfTHIfGcmPSScvyEBCFuzU';
const form = document.querySelector('.get-weather-form');
let cityForm = document.querySelector('.form__input');


form.addEventListener('submit', async e => {
	e.preventDefault();
	let city = cityForm.value.toLowerCase();
	if (city) {
		try {
			let weatherInfo = await getFetch(city);
			console.log('hello');
			displayWeatherInfo(weatherInfo);
		} catch (error) {
			console.error(error);
			displayError(error);
		}
	} else {
		displayError('Please enter a city');
	}
});


async function getFetch(city) {

	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30b3e480af39c5c8a31c53584f1bdd67`
	const response = await fetch(apiUrl);

	if (!response.ok) {
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
	const cardHumidity = document.createElement('p');
	const cardSky = document.createElement('p');
	const cardEmoji = document.createElement('p');

	card.classList.add('weather-card');
	cardCity.classList.add('card__city');
}

function displayError(message) {
	const cardError = document.createElement('p');
}

function clearCard(){

}