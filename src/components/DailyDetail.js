import { useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { formatTime, formatDayDate } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import styled from 'styled-components';
import { useWeather } from '../context/WeatherContext';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import CloseButton from './CloseButton';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import ModalBackdrop from './ModalBackdrop';

const DailyDetail = ({ pathId }) => {
	const navigate = useNavigate();
	const closeRef = useRef();

	const { weatherState } = useWeather();
	const { weather } = weatherState;
	const { daily, timezoneOffset } = weather;

	const day = daily.filter((day) => day.dt.toString() === pathId.toString())[0];
	const index = daily.findIndex(
		(day) => day.dt.toString() === pathId.toString()
	);

	useEffect(() => {
		closeRef.current.focus();
	}, []);

	useEffect(() => {
		function onKeyDown(event) {
			const escape = event.key === 'Escape';
			const isLeft = event.key === 'ArrowLeft';
			const isRight = event.key === 'ArrowRight';

			if (escape) {
				navigate('/');
			} else if (index > 0 && isLeft) {
				navigate(`/daily/${day.dt - 86400}`);
			} else if (index < 7 && isRight) {
				navigate(`/daily/${day.dt + 86400}`);
			}
		}
		document.body.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.removeEventListener('keydown', onKeyDown);
		};
	}, [day.dt, index, navigate]);

	return (
		<ModalBackdrop>
			<DayDetail>
				<DailyHeader>
					<CloseButton
						ref={closeRef}
						onClick={() => navigate('/')}
						className='close'
					/>
				</DailyHeader>
				<DailyDetailMain>
					<DailyDetailDay>
						<h1>{formatDayDate(day.dt, timezoneOffset)}</h1>
					</DailyDetailDay>
					<DailyDetailDescription>
						<h2>{day.weather[0].description}</h2>
						<img
							src={convertIcon(day.weather[0].icon)}
							alt={day.weather[0].main}
						/>
					</DailyDetailDescription>
					<DailyDetailTempGrid>
						<div className='icon'>
							<BsChevronCompactUp size={20} />
						</div>
						<DailyDetailTempHigh>
							<p>
								{Math.round(day.temp.max)}
								<span>&#176;C</span>
							</p>
						</DailyDetailTempHigh>
						<DailyDetailTempLow>
							<p>
								{Math.round(day.temp.min)}
								<span>&#176;C</span>
							</p>
						</DailyDetailTempLow>
						<div className='icon'>
							<BsChevronCompactDown size={20} />
						</div>
					</DailyDetailTempGrid>
				</DailyDetailMain>

				<DailyDetailGrid>
					<DailyDetailCard>
						<DailyDetailCardTitle>Sunrise</DailyDetailCardTitle>
						<DailyDetailCardContent>
							{formatTime(day.sunrise, timezoneOffset)}
						</DailyDetailCardContent>
					</DailyDetailCard>
					<DailyDetailCard>
						<DailyDetailCardTitle>Sunset</DailyDetailCardTitle>
						<DailyDetailCardContent>
							{formatTime(day.sunset, timezoneOffset)}
						</DailyDetailCardContent>
					</DailyDetailCard>
					<DailyDetailCard>
						<DailyDetailCardTitle>UV Index</DailyDetailCardTitle>
						<DailyDetailCardContent>{day.uvi}</DailyDetailCardContent>
					</DailyDetailCard>
					<DailyDetailCard>
						<DailyDetailCardTitle>Cloudiness</DailyDetailCardTitle>
						<DailyDetailCardContent>{day.clouds}%</DailyDetailCardContent>
					</DailyDetailCard>
					<DailyDetailCard>
						<DailyDetailCardTitle>Probability of Rain</DailyDetailCardTitle>
						<DailyDetailCardContent>
							{(day.pop * 100).toFixed(0)}%
						</DailyDetailCardContent>
					</DailyDetailCard>
					<DailyDetailCard>
						<DailyDetailCardTitle>Humidity</DailyDetailCardTitle>
						<DailyDetailCardContent>{day.humidity}%</DailyDetailCardContent>
					</DailyDetailCard>
					<DailyDetailCard>
						<DailyDetailCardTitle>Pressure</DailyDetailCardTitle>
						<DailyDetailCardContent>{day.pressure} hPa</DailyDetailCardContent>
					</DailyDetailCard>
					<DailyDetailCard>
						<DailyDetailCardTitle>Wind</DailyDetailCardTitle>
						<DailyDetailCardContent className='wind'>
							{Math.round(day.wind_speed * 2.237).toFixed(0)} mph{' '}
							{convertWindDirection(day.wind_deg)} wind
						</DailyDetailCardContent>
					</DailyDetailCard>
				</DailyDetailGrid>

				<DailyDetailTempTable>
					<colgroup span='3'></colgroup>
					<thead>
						<tr>
							<th>Time</th>
							<th>Temperature &#176;C</th>
							<th>Feels Like &#176;C</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Morning</td>
							<td className='number'>{Math.round(day.temp.morn)}</td>
							<td className='number'>{Math.round(day.feels_like.morn)}</td>
						</tr>
						<tr>
							<td>Day</td>
							<td className='number'>{Math.round(day.temp.day)}</td>
							<td className='number'>{Math.round(day.feels_like.day)}</td>
						</tr>
						<tr>
							<td>Evening</td>
							<td className='number'>{Math.round(day.temp.eve)}</td>
							<td className='number'>{Math.round(day.feels_like.eve)}</td>
						</tr>

						<tr>
							<td>Night</td>
							<td className='number'>{Math.round(day.temp.night)}</td>
							<td className='number'>{Math.round(day.feels_like.night)}</td>
						</tr>
					</tbody>
				</DailyDetailTempTable>

				<DailyFooter>
					<DailyDetailNavPrev>
						{index > 0 && (
							<Link to={`/daily/${day.dt - 86400}`}>
								<FiChevronsLeft />
							</Link>
						)}
					</DailyDetailNavPrev>
					<DailyDetailNavNext>
						{index < 7 && (
							<Link to={`/daily/${day.dt + 86400}`}>
								<FiChevronsRight />
							</Link>
						)}
					</DailyDetailNavNext>
				</DailyFooter>
			</DayDetail>
		</ModalBackdrop>
	);
};

export default DailyDetail;

const DayDetail = styled.div`
	max-width: 380px;
	width: 90%;
	max-height: 95%;
	padding: 1rem;
	position: absolute;
	margin: auto;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	overflow-y: scroll;
	z-index: 10;
	background-image: linear-gradient(
		140deg,
		hsl(219, 58%, 28%) 0%,
		hsl(219, 58%, 28%) 1%,
		hsl(218, 57%, 38%) 100%
	);
	box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);
`;

const DailyHeader = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const DailyFooter = styled.div`
	display: flex;
	justify-content: space-between;
`;

const DailyDetailNavPrev = styled.div``;
const DailyDetailNavNext = styled.div``;

const DailyDetailMain = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const DailyDetailDay = styled.div`
	margin-bottom: 1.5rem;

	h1 {
		font-size: 1.5rem;
	}
`;

const DailyDetailDescription = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h2 {
		text-transform: capitalize;
		font-weight: 400;
		font-family: 'SofiaProRegular';
		font-size: 1.125rem;
	}

	img {
		height: 4rem;
		width: 4rem;
	}
`;

const DailyDetailTempGrid = styled.div`
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 28px 84px 58px 28px;
	grid-template-rows: 60px;
	grid-column-gap: 1rem;
	justify-items: center;
	align-items: center;

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
`;

const DailyDetailTempHigh = styled.div`
	display: flex;
	align-items: center;

	p {
		display: flex;
		align-items: flex-start;
		font-weight: 200;
		font-family: 'SofiaProExtraLight';
		font-size: 3.5rem;

		span {
			font-size: 1.5rem;
			font-weight: 100;
			font-family: 'SofiaProUltraLight';
			margin-top: 0.25rem;
		}
	}

	.icon {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		margin: 0 1rem;
	}
`;

const DailyDetailTempLow = styled.div`
	display: flex;
	align-items: center;

	p {
		display: flex;
		align-items: flex-start;
		font-weight: 100;
		font-size: 2.75rem;
		font-family: 'SofiaProUltraLight';

		span {
			font-size: 1.25rem;
			font-weight: 100;
			font-family: 'SofiaProUltraLight';
			margin-top: 0.125rem;
		}
	}

	.icon {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		margin: 0 1rem;
	}
`;

const DailyDetailGrid = styled.div`
	width: 90%;
	margin-left: auto;
	margin-right: auto;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	grid-column-gap: 2.5rem;
	grid-row-gap: 1rem;
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
`;

const DailyDetailCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	margin-bottom: 0.5rem;
	height: 100%;
	width: 100%;
`;

const DailyDetailCardTitle = styled.h5`
	font-size: 0.75rem;
	opacity: 0.9;
	text-transform: uppercase;
	margin-bottom: 0.125rem;
`;

const DailyDetailCardContent = styled.p`
	font-size: 1rem;
`;

const DailyDetailTempTable = styled.table`
	font-size: 0.9rem;
	width: 90%;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 1rem;

	thead {
		margin-bottom: 0.5rem;
	}

	tr {
		margin-bottom: 0.5rem;
	}

	th {
		font-size: 0.75rem;
		opacity: 0.9;
		text-transform: uppercase;
		text-align: left;
		padding-bottom: 0.5rem;
	}

	td {
		margin-right: 0.5rem;
		padding-bottom: 0.25rem;
	}

	.number {
		text-align: center;
	}
`;
