export const initialState = {
	status: 'idle',
	weather: null,
	error: null,
};

export function weatherReducer(state, action) {
	switch (action.type) {
		case 'FETCH_WEATHER_REQUEST':
			return {
				...state,
				status: 'loading',
			};
		case 'GET_COORDS_WEATHER':
			return {
				...state,
				status: 'resolved',
				weather: action.weather,
			};
		case 'GET_CITY_WEATHER':
			return {
				...state,
				status: 'resolved',
				weather: action.weather,
			};
		case 'ERROR':
			return {
				...state,
				status: 'rejected',
				error: action.error,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}
