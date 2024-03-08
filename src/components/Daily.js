import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useWeather } from '../context/WeatherContext';
import convertIcon from '../utils/convertIcon';
import { formatDayDate } from '../utils/convertUnixTime';
import { BsUmbrella } from 'react-icons/bs';
import ErrorMessage from './ErrorMessage';

const Daily = () => {
	const { weatherState } = useWeather();
	const { weather } = weatherState;
	const { daily, timezoneOffset } = weather;

	if (!daily)
		return (
			<ErrorMessage message='No daily weather data available. Please try again or enter a new location.' />
		);

	return (
		<StyledDaily>
			<DailyContainer>
				<DailySummary>
					<DailyGrid>
						<div></div>
						<div></div>
						<DailyGridRain>
							<BsUmbrella size='0.8rem' />
						</DailyGridRain>
						<DailyGridTempHigh>H</DailyGridTempHigh>
						<DailyGridTempLow>L</DailyGridTempLow>
					</DailyGrid>
				</DailySummary>
				{daily &&
					daily.map((dp) => (
						<DailySummary key={dp.dt}>
							<Link to={`/daily/${dp.dt}`}>
								<DailyGrid>
									<DailyGridDay>
										{formatDayDate(dp.dt, timezoneOffset)}
									</DailyGridDay>
									<img
										src={convertIcon(dp.weather[0].icon)}
										alt={dp.weather[0].main}
									/>
									<DailyGridRain>
										{(dp.pop * 100).toFixed(0)}%
									</DailyGridRain>
									<DailyGridTempHigh>
										<p>{Math.round(dp.temp.max)}&#176;C</p>
									</DailyGridTempHigh>
									<DailyGridTempLow>
										<p>{Math.round(dp.temp.min)}&#176;C</p>
									</DailyGridTempLow>
								</DailyGrid>
							</Link>
						</DailySummary>
					))}
			</DailyContainer>
		</StyledDaily>
	);
};

export default Daily;

const StyledDaily = styled.section`
	width: 100%;
	margin: 0.5rem auto;
`;

const DailyContainer = styled.div`
	display: flex;
	flex-direction: column;
	overflow-x: scroll;
	width: 100%;
	margin: 0 auto;
	padding: 0.5rem;
`;

const DailySummary = styled.div`
	width: 100%;
	min-height: 1.5rem;
	margin-bottom: 0.25rem;
	display: flex;
	flex-direction: column;
	transition: all 0.2s ease-out;
	cursor: pointer;

	a {
		text-decoration: none;
	}
`;

const DailyGrid = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 2fr 1fr 1fr 1fr 1fr;

	img {
		height: 2rem;
		width: 2rem;
	}

	p {
		font-size: 0.9rem;
	}
`;

const DailyGridDay = styled.p`
	margin-left: 0.5rem;
	font-weight: 400;
`;

const DailyGridRain = styled.p`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 200;

	svg {
		margin-right: 0.25rem;
	}
`;

const DailyGridTempHigh = styled.div`
	display: flex;
	justify-content: center;
`;
const DailyGridTempLow = styled.div`
	display: flex;
	justify-content: center;
`;
