const axios = require('axios');

const fetchAddress = async (lat, lon) => {
	return await axios
		.get(
			`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.REACT_OPENCAGE_KEY}`
		)
		.then((response) => {
			let address = response.data.results[0].formatted;
			if (address.length > 3) {
				address = address.split(', ').slice(-3).join(', ');
			}
			return address;
		})
		.catch((error) => {
			if (error.response) {
				console.log('Data: ', error.response.data);
				console.log('Status: ', error.response.status);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
		});
};

exports.handler = async function (event, context) {
	const { lat, lon } = JSON.parse(event.body);

	return await axios
		.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_OPENWEATHER_APP_ID}`
		)
		.then(async (response) => {
			const address = await fetchAddress(lat, lon);

			const weather = {
				timezone: response.data.timezone.split('/'),
				timezoneOffset: response.data.timezone_offset,
				location: address,
				// current = Object
				current: response.data.current,
				// daily && hourly && minutely = Array
				daily: response.data.daily,
				hourly: response.data.hourly,
				minutely: response.data.minutely,
				alerts: response.data.alerts || 'No current weather warnings',
				all: response.data,
			};

			// console.log('coords NF', weather);

			return {
				statusCode: 200,
				body: JSON.stringify({ weather }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		})
		.catch((error) => {
			if (error.response) {
				console.log('Data: ', error.response.data);
				console.log('Status: ', error.response.status);
				return {
					statusCode: error?.response?.status,
					body: JSON.stringify({ message: error?.response?.data.message }),
				};
			} else if (error.request) {
				console.log(error.request);
				return {
					statusCode: error?.response?.status,
					body: JSON.stringify({ message: error?.response?.data.message }),
				};
			} else {
				console.log('Error', error.message);
				return {
					statusCode: error?.response?.status,
					body: JSON.stringify({ message: error?.response?.data.message }),
				};
			}
		});
};
