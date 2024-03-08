import { useWeather } from '../context/WeatherContext';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import ModalOptions from './ModalOptions';
import Currently from './Currently';
import Hourly from './Hourly';
import Daily from './Daily';
import Minutely from './Minutely';
import Loading from './Loading';

export default function Results() {
	const { weatherState } = useWeather();
	const { status, weather, error } = weatherState;

	return (
		<StyledResults>
			{status === 'loading' && <Loading />}
			{status === 'rejected' && error && (
				<ErrorMessage error={error} />
			)}
			{status === 'resolved' && weather && (
				<>
					<ModalOptions />
					<Currently />
					<Hourly />
					<Daily />
					<Minutely />
				</>
			)}
		</StyledResults>
	);
}

const StyledResults = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;
