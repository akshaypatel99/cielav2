import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useWeather } from '../context/WeatherContext';
import convertIcon from '../utils/convertIcon';
import { formatTime } from '../utils/convertUnixTime';
import ErrorMessage from './ErrorMessage';

const Hourly = () => {
	const { weatherState } = useWeather();
	const { weather } = weatherState;
	const { hourly, timezoneOffset } = weather;

	if (!hourly)
		return (
			<ErrorMessage message='No hourly weather data available. Please try again or enter a new location.' />
		);

	return (
		<StyledHourly>
			<HourlyContainer>
				{hourly &&
					hourly.map((dp) => (
						<HourlySummary
							key={dp.dt}
							newDay={formatTime(dp.dt, timezoneOffset) === '00:00'}
						>
							<Link to={`/hourly/${dp.dt}`}>
								<h5>{formatTime(dp.dt, timezoneOffset)}</h5>
								<img
									src={convertIcon(dp.weather[0].icon)}
									alt={dp.weather[0].main}
								/>
								<h5>{Math.round(dp.temp)}&#176;C</h5>
							</Link>
						</HourlySummary>
					))}
			</HourlyContainer>
		</StyledHourly>
	);
};

export default Hourly;

const StyledHourly = styled.section`
	width: 100%;
	margin: 0.5rem auto;
`;

const HourlyContainer = styled.div`
	display: flex;
	overflow-x: scroll;
	width: 100%;
	margin: 0 auto;
	padding: 0.5rem;
`;

const HourlySummary = styled.div`
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	text-align: center;
	object-fit: contain;
	width: 48px;
	height: 128px;
	margin-right: 10px;
	transition: transform 0.2s ease-out;
	cursor: pointer;

	a {
		text-decoration: none;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	h5 {
		font-weight: 400;
		font-family: 'SofiaProRegular';
		color: ${({ newDay }) => (newDay ? '#ffcc00' : '#fff')};
	}
`;
