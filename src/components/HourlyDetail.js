import { useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { formatTime } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import styled from 'styled-components';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';
import CloseButton from './CloseButton';
import ModalBackdrop from './ModalBackdrop';

const HourlyDetail = ({ pathId }) => {
	const navigate = useNavigate();
	const closeRef = useRef();

	const { weatherState } = useWeather();
	const { weather } = weatherState;
	const { hourly, timezoneOffset } = weather;

	const hour = hourly.filter(
		(hour) => hour.dt.toString() === pathId.toString()
	)[0];
	const index = hourly.findIndex(
		(hour) => hour.dt.toString() === pathId.toString()
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
				navigate(`/hourly/${hour.dt - 3600}`);
			} else if (index < 47 && isRight) {
				navigate(`/hourly/${hour.dt + 3600}`);
			}
		}
		document.body.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.removeEventListener('keydown', onKeyDown);
		};
	}, [hour.dt, index, navigate]);

	return (
		<ModalBackdrop>
			<HourDetail>
				<HourlyHeader>
					<CloseButton
						ref={closeRef}
						onClick={() => navigate('/')}
						className='close'
					/>
				</HourlyHeader>

				<HourlyDetailMain>
					<HourlyDetailDay>
						<h1>{formatTime(hour.dt, timezoneOffset)}</h1>
					</HourlyDetailDay>
					<HourlyDetailDescription>
						<h2>{hour.weather[0].description}</h2>
						<img
							src={convertIcon(hour.weather[0].icon)}
							alt={hour.weather[0].main}
						/>
					</HourlyDetailDescription>
					<HourlyDetailTemp>
						<h3>
							{Math.round(hour.temp)}
							<span>&#176;C</span>
						</h3>
					</HourlyDetailTemp>
				</HourlyDetailMain>

				<HourlyDetailGrid>
					<HourlyDetailCard>
						<HourlyDetailCardTitle>Feels like</HourlyDetailCardTitle>
						<HourlyDetailCardContent>
							{hour.feels_like.toFixed(0)}&#176;C
						</HourlyDetailCardContent>
					</HourlyDetailCard>
					<HourlyDetailCard>
						<HourlyDetailCardTitle>Cloudiness</HourlyDetailCardTitle>
						<HourlyDetailCardContent>{hour.clouds}%</HourlyDetailCardContent>
					</HourlyDetailCard>
					<HourlyDetailCard>
						<HourlyDetailCardTitle>UV Index</HourlyDetailCardTitle>
						<HourlyDetailCardContent>{hour.uvi}</HourlyDetailCardContent>
					</HourlyDetailCard>
					<HourlyDetailCard>
						<HourlyDetailCardTitle>Probability of Rain</HourlyDetailCardTitle>
						<HourlyDetailCardContent>
							{(hour.pop * 100).toFixed(0)}%
						</HourlyDetailCardContent>
					</HourlyDetailCard>
					<HourlyDetailCard>
						<HourlyDetailCardTitle>Humidity</HourlyDetailCardTitle>
						<HourlyDetailCardContent>{hour.humidity}%</HourlyDetailCardContent>
					</HourlyDetailCard>
					<HourlyDetailCard>
						<HourlyDetailCardTitle>Pressure</HourlyDetailCardTitle>
						<HourlyDetailCardContent>
							{hour.pressure} hPa
						</HourlyDetailCardContent>
					</HourlyDetailCard>
					<HourlyDetailCard>
						<HourlyDetailCardTitle>Visibility</HourlyDetailCardTitle>
						<HourlyDetailCardContent>
							{hour.visibility} metres
						</HourlyDetailCardContent>
					</HourlyDetailCard>
					<HourlyDetailCard>
						<HourlyDetailCardTitle>Wind</HourlyDetailCardTitle>
						<HourlyDetailCardContent className='wind'>
							{Math.round(hour.wind_speed * 2.237).toFixed(0)} mph{' '}
							{convertWindDirection(hour.wind_deg)} wind
						</HourlyDetailCardContent>
					</HourlyDetailCard>
				</HourlyDetailGrid>

				<HourlyFooter>
					<HourlyDetailNavPrev>
						{index > 0 && (
							<Link to={`/hourly/${hour.dt - 3600}`}>
								<FiChevronsLeft />
							</Link>
						)}
					</HourlyDetailNavPrev>
					<HourlyDetailNavNext>
						{index < 47 && (
							<Link to={`/hourly/${hour.dt + 3600}`}>
								<FiChevronsRight />
							</Link>
						)}
					</HourlyDetailNavNext>
				</HourlyFooter>
			</HourDetail>
		</ModalBackdrop>
	);
};

export default HourlyDetail;

const HourDetail = styled.div`
	max-width: 380px;
	width: 90%;
	max-height: 90%;
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

const HourlyHeader = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const HourlyFooter = styled.div`
	display: flex;
	justify-content: space-between;
`;

const HourlyDetailNavPrev = styled.div``;
const HourlyDetailNavNext = styled.div``;

const HourlyDetailMain = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const HourlyDetailDay = styled.div`
	margin-bottom: 1.5rem;

	h1 {
		font-size: 1.5rem;
	}
`;

const HourlyDetailDescription = styled.div`
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

const HourlyDetailTemp = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 1rem;

	h3 {
		display: flex;
		align-items: flex-start;
		font-weight: 200;
		font-family: 'SofiaProExtraLight';
		font-size: 3.75rem;
		margin-bottom: 0.25rem;

		span {
			font-size: 1.5rem;
			font-weight: 100;
			font-family: 'SofiaProUltraLight';
			margin-top: 0.2rem;
		}
	}
`;

const HourlyDetailGrid = styled.div`
	width: 90%;
	margin-left: auto;
	margin-right: auto;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	grid-column-gap: 2.5rem;
	grid-row-gap: 1rem;
	margin-top: 2.5rem;
	margin-bottom: 2.5rem;
`;

const HourlyDetailCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	margin-bottom: 0.5rem;
	height: 100%;
	width: 100%;
`;

const HourlyDetailCardTitle = styled.h5`
	font-size: 0.75rem;
	opacity: 0.9;
	text-transform: uppercase;
	margin-bottom: 0.125rem;
`;

const HourlyDetailCardContent = styled.p`
	font-size: 1rem;
`;
