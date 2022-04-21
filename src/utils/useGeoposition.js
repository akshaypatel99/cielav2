import { useEffect, useReducer } from 'react';

function geoPositionReducer(state, action) {
	switch (action.type) {
		case 'error': {
			return {
				...state,
				status: 'rejected',
				error: action.error,
			};
		}
		case 'success': {
			return {
				...state,
				status: 'resolved',
				position: action.position,
			};
		}
		case 'started': {
			return {
				...state,
				status: 'pending',
			};
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

export function useGeoPosition() {
	const [state, dispatch] = useReducer(geoPositionReducer, {
		status: 'idle',
		position: null,
		error: null,
	});

	useEffect(() => {
		if (!navigator.geolocation) {
			dispatch({
				type: 'error',
				error: new Error('Geolocation is not supported'),
			});
			return;
		}
		dispatch({ type: 'started' });
		navigator.geolocation.getCurrentPosition(
			(position) => dispatch({ type: 'success', position }),
			(error) => dispatch({ type: 'error', error })
		);
	}, []);

	return state;
}
