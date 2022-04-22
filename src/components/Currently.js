import styled from 'styled-components';
import { useWeather } from '../context/WeatherContext';
import convertIcon from '../utils/convertIcon';
import {
	FiChevronUp,
	FiChevronDown,
	FiSunrise,
	FiSunset,
} from 'react-icons/fi';
import { formatTime } from '../utils/convertUnixTime';

const Currently = () => {
	const { weatherState } = useWeather();
	const { weather } = weatherState;
	const { current, daily, location, timezoneOffset } = weather;

	return (
		<StyledCurrently>
			<CurrentlyDescription>
				<img
					src={convertIcon(current.weather[0].icon)}
					alt={current.weather[0].main}
				/>
				<h4>{current.weather[0].description}</h4>
			</CurrentlyDescription>
			<CurrentlyTemp>
				{Math.round(current.temp)}
				<span>&#176;C</span>
			</CurrentlyTemp>
			<CurrentlyCity>{location}</CurrentlyCity>
			<CurrentlyTempGrid>
				<CurrentlyHigh>
					<FiChevronUp />
					<p>{Math.round(daily[0].temp.max)}&#176;C</p>
				</CurrentlyHigh>
				<CurrentlyFeelsLike>
					<p>Feels like {Math.round(current.feels_like)}&#176;C</p>
				</CurrentlyFeelsLike>
				<CurrentlyLow>
					<FiChevronDown />
					<p>{Math.round(daily[0].temp.min)}&#176;C</p>
				</CurrentlyLow>
			</CurrentlyTempGrid>
			<CurrentlySun>
				<div>
					<FiSunrise /> <p>{formatTime(current.sunrise, timezoneOffset)}</p>
				</div>
				<div>
					<FiSunset /> <p>{formatTime(current.sunset, timezoneOffset)}</p>
				</div>
			</CurrentlySun>
		</StyledCurrently>
	);
};

export default Currently;

const StyledCurrently = styled.section`
	width: 100%;
	margin: 0 auto 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

const CurrentlyDescription = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h4 {
		text-transform: capitalize;
		font-size: 1.125rem;
		font-weight: 400;
		font-family: 'SofiaProRegular';
		margin-top: 0.25rem;
	}

	img {
		height: 2.5rem;
		width: 2.5rem;
	}
`;

const CurrentlyTemp = styled.h3`
	grid-column: 2 / span 1;
	grid-row: 1 / span 1;
	margin-top: 1.5rem;
	margin-bottom: 1rem;
	font-size: 4.5rem;
	font-weight: 200;
	font-family: 'SofiaProExtraLight';
	display: flex;
	align-items: flex-start;

	span {
		font-size: 2rem;
		font-weight: 100;
		font-family: 'SofiaProUltraLight';
		margin-top: 0.25rem;
	}
`;

const CurrentlyCity = styled.h2`
	font-size: 1rem;
	margin-bottom: 0.5rem;
`;

const CurrentlyTempGrid = styled.div`
	display: grid;
	grid-template-columns: (1fr, 2fr, 1fr);
	grid-column-gap: 1rem;
	margin-top: 2rem;
	margin-bottom: 0.5rem;
`;

const CurrentlyFeelsLike = styled.div`
	display: flex;
	align-items: center;
	grid-column: 2 / span 1;

	p {
		font-size: 0.9rem;
	}
`;

const CurrentlyHigh = styled.div`
	display: flex;
	align-items: center;
	grid-column: 1 / span 1;

	p {
		font-size: 0.9rem;
	}
`;

const CurrentlyLow = styled.div`
	display: flex;
	align-items: center;
	grid-column: 3 / span 1;

	p {
		font-size: 0.9rem;
	}
`;

const CurrentlySun = styled.div`
	display: flex;
	align-items: center;
	margin: 1rem auto 0;

	& > div {
		display: flex;
		align-items: center;
		padding: 0 1rem;

		p {
			font-size: 0.9rem;
			margin-left: 0.5rem;
		}
	}
`;
