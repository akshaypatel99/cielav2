import { useQuery } from 'react-query';
import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export default function useWeather(method) {
	const { data, status, error } = useQuery(['weather', method], async () => {
		if (method.route === 'coords') {
			const response = await axios.post(
				'/.netlify/functions/coords',
				JSON.stringify({
					lat: method.position.coords.latitude,
					lon: method.position.coords.longitude,
				}),
				config
			);
			return response.data.weather;
		}

		if (method.route === 'city') {
			const response = await axios.post(
				'/.netlify/functions/city',
				JSON.stringify({
					city: method.city,
				}),
				config
			);
			return response.data.weather;
		}
		return null;
	});
	return { data, status, error };
}
