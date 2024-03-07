const axios = require('axios');

const fetchLatLong = async (city) => {
	return await axios
		.get(
			`https://api.opencagedata.com/geocode/v1/json?q=${city}&limit=1&key=${process.env.REACT_OPENCAGE_KEY}`
		)
		.then((response) => {
			return {
				lat: response.data.results[0].geometry.lat.toString(),
				lon: response.data.results[0].geometry.lng.toString(),
			};
		})
		.catch((error) => {
			if (error.response) {
				console.log('Data: ', error.response.data);
				console.log('Status: ', error.response.status);
				throw new Error({ message: error?.response?.data.message });
			} else if (error.request) {
				console.log(error.request);
				throw new Error({ message: error?.response?.data.message });
			} else {
				console.log('Error', error.message);
				throw new Error({ message: error?.response?.data.message });
			}
		});
};

exports.handler = async function (event, context) {
	const { city } = JSON.parse(event.body);
	const encodedCity = encodeURI(city);
	const { lat, lon } = await fetchLatLong(encodedCity);
	return await axios
		.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_OPENWEATHER_APP_ID}`
		)
		.then((response) => {
			const weather = {
				timezone: response.data.timezone.split('/'),
				timezoneOffset: response.data.timezone_offset,
				location: city,
				// current = Object
				current: response.data.current,
				// daily && hourly && minutely = Array
				daily: response.data.daily,
				hourly: response.data.hourly,
				minutely: response.data.minutely,
				alerts: response.data.alerts || 'No current weather warnings',
				all: response.data,
			};

			// console.log('city NF', weather);

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
					body: JSON.stringify({
						message: error?.response?.data.message,
					}),
				};
			} else if (error.request) {
				console.log(error.request);
				return {
					statusCode: error?.response?.status,
					body: JSON.stringify({
						message: error?.response?.data.message,
					}),
				};
			} else {
				console.log('Error', error.message);
				return {
					statusCode: error?.response?.status,
					body: JSON.stringify({
						message: error?.response?.data.message,
					}),
				};
			}
		});
};
