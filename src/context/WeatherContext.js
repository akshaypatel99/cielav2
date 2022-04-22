import { createContext, useContext, useEffect, useReducer } from 'react';

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children, reducer, initialState }) => {
	const [weatherState, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		let cielaWeather = {
			weather: weatherState,
			expiresIn: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
		};
		localStorage.setItem('ciela', JSON.stringify(cielaWeather));
	}, [weatherState]);

	return (
		<WeatherContext.Provider value={{ weatherState, dispatch }}>
			{children}
		</WeatherContext.Provider>
	);
};
