const axios = require('axios');

const fetchAddress = async (lat, lon) => {
	let address = '';

	const response = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.REACT_OPENCAGE_KEY}`
	);

	address = response.data.results[0].formatted;
	if (address.length > 3) {
		const formattedAddress = address.split(', ').slice(-3).join(', ');
		return formattedAddress;
	} else {
		return address;
	}
};

exports.handler = async function (event, context) {
	try {
		const { lat, lon } = JSON.parse(event.body);
		let weather = {};
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_OPENWEATHER_APP_ID}`
		);

		console.log('coords response', response);

		const address = await fetchAddress(lat, lon);

		weather = {
			timezone: response.data.timezone.split('/'),
			timezoneOffset: response.data.timezone_offset,
			address: address,
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
