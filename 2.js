const apiKey = 'f3xnRLADXhGfTHIfGcmPSScvyEBCFuzU';
const form = document.querySelector('.get-weather-form');
let cityForm = document.querySelector('.form__input');



form.addEventListener('submit', async e => {
	e.preventDefault();
	let city = cityForm.value.toLowerCase();
	if (city) {
		try {
			let weatherInfo = await getFetch(city);
			console.log('weatherInfo :>> ', weatherInfo);
			date = weatherInfo.DateTime;
			console.log('date :>> ', date);

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
	const apiCityUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}&language=en-us&details=false`;
	const responseCity = await fetch(apiCityUrl);
	if (!responseCity.ok) {
		throw new Error('Could not fetch city data');
	}

	const arrOfCities = await responseCity.json();
	const cityKey = arrOfCities[0].Key;
	const apiWeatherUrl = `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${cityKey}?apikey=${apiKey}&language=ru-ru&details=true&metric=true`;
	const responseWeather = await fetch(apiWeatherUrl);

	if (!responseWeather.ok) {
		throw new Error('Could not fetch weather data');
	}
	const [weather] = await responseWeather.json();
	console.log(weather)
	return weather;
}

function displayWeatherInfo(data) {
	const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
	console.log('city, main, weather :>> ', city, temp, humidity, description, id);
}

function displayError(message) {

}