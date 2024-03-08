import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getCoordsWeather = () => async (dispatch) => {
	try {
		if (!navigator.geolocation) {
			dispatch({
				type: 'ERROR',
				error: new Error('Geolocation is not supported'),
			});
			return;
		}
		dispatch({ type: 'FETCH_WEATHER_REQUEST' });
		const position = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => resolve(position),
				(error) => reject(error)
			);
		});
		const { latitude, longitude } = position.coords;

		await axios
			.post(
				'/.netlify/functions/coords',
				JSON.stringify({
					lat: latitude,
					lon: longitude,
				}),
				config
			)
			.then((response) => {
				dispatch({
					type: 'GET_COORDS_WEATHER',
					weather: response.data.weather,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'ERROR',
					error: error,
				});
			});
	} catch (error) {
		dispatch({
			type: 'ERROR',
			error: error,
		});
	}
};

export const getCityWeather = (city) => async (dispatch) => {
	try {
		dispatch({ type: 'FETCH_WEATHER_REQUEST' });
		await axios
			.post(
				'/.netlify/functions/city',
				JSON.stringify({
					city: city,
				}),
				config
			)
			.then((response) => {
				dispatch({
					type: 'GET_CITY_WEATHER',
					weather: response.data.weather,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'ERROR',
					error: error,
				});
			});
	} catch (error) {
		dispatch({
			type: 'ERROR',
			error: error,
		});
	}
};
