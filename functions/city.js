const axios = require('axios');

const fetchLatlong = async (city) => {
	let lat = '';
	let lng = '';

	const response = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=${city}&limit=1&key=${process.env.REACT_OPENCAGE_KEY}`
	);

	lat = response.data.results[0].geometry.lat;
	lng = response.data.results[0].geometry.lng;

	console.log(lat, lng);

	return {
		lat: lat.toString(),
		lon: lng.toString(),
	};
};

exports.handler = async function (event, context) {
	try {
		const { city } = JSON.parse(event.body);
		let weather = {};
		const encodedCity = encodeURI(city);
		const { lat, lon } = await fetchLatlong(encodedCity);
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_OPENWEATHER_APP_ID}`
		);

		weather = {
			timezone: response.data.timezone.split('/'),
			timezoneOffset: response.data.timezone_offset,
			// current = Object
			current: response.data.current,
			// daily && hourly && minutely = Array
			daily: response.data.daily,
			hourly: response.data.hourly,
			minutely: response.data.minutely,
			alerts: response.data.alerts || 'No current weather warnings',
			all: response.data,
		};

		console.log(weather);

		return {
			statusCode: 200,
			body: JSON.stringify({ weather }),
			headers: {
				'Content-Type': 'application/json',
			},
		};
	} catch (error) {
		console.error(error);
		console.log(JSON.stringify(error.response.data.message));
		return {
			statusCode: error.response.data.cod,
			body: JSON.stringify({ message: error.response.data.message }),
		};
	}
};
