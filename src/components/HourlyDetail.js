import { useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { formatTime } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import styled from 'styled-components';
import { FiChevronsLeft, FiChevronsRight, FiX } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';

const HourlyDetail = ({ pathId }) => {
	const navigate = useNavigate();
	const closeRef = useRef();

	const exitDetailHandler = (e) => {
		const element = e.target;
		if (element.classList.contains('shadow')) {
			document.body.style.overflow = 'auto';
			navigate('/');
		}
	};

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
		<>
			<CardShadow className='shadow' onClick={exitDetailHandler}>
				<HourDetail>
					<>
						<div className='hourlydtl__title'>
							<h2>{formatTime(hour.dt, timezoneOffset)}</h2>
						</div>

						<div
							className='hourlydtl__close'
							ref={closeRef}
							tabIndex='6'
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									navigate('/');
								}
							}}
						>
							<FiX onClick={() => navigate('/')} />
						</div>

						<div className='hourlydtl'>
							<div className='hourlydtl__top'>
								<div className='hourlydtl__top__desc'>
									<h3>{hour.weather[0].description}</h3>
								</div>

								<div className='hourlydtl__top__weather'>
									<img
										src={convertIcon(hour.weather[0].icon)}
										alt={hour.weather[0].main}
									/>
									<h2>{Math.round(hour.temp)}&#176;C</h2>
								</div>
							</div>
							<div className='hourlydtl__bottom'>
								<div className='hourlydtl__bottom__info'>
									<div className='hourlydtl__bottom__info__icons'>
										<h6>Feels like: {hour.feels_like.toFixed(0)}&#176;C</h6>
									</div>
									<div className='hourlydtl__bottom__info__icons'>
										<h6>{hour.clouds}% cloudy</h6>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<h6>{(hour.pop * 100).toFixed(0)}% chance of rain</h6>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<h6>UV Index: {hour.uvi}</h6>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<h6>{hour.humidity}% humidity</h6>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<h6>Pressure: {hour.pressure} hPa</h6>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<h6>Visibility: {hour.visibility} metres</h6>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<h6>
											{Math.round(hour.wind_speed * 2.237).toFixed(0)} mph{' '}
											{convertWindDirection(hour.wind_deg)} wind
										</h6>
									</div>
								</div>
							</div>
						</div>

						<div className='hourlydtl__nav__prev'>
							{index > 0 && (
								<Link to={`/hourly/${hour.dt - 3600}`}>
									<FiChevronsLeft />
								</Link>
							)}
						</div>
						<div className='hourlydtl__nav__next'>
							{index < 47 && (
								<Link to={`/hourly/${hour.dt + 3600}`}>
									<FiChevronsRight />
								</Link>
							)}
						</div>
					</>
				</HourDetail>
			</CardShadow>
		</>
	);
};

const CardShadow = styled.div`
	width: 100%;
	min-height: 100vh;
	overflow-y: scroll;
	background: hsl(208, 100%, 60%, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;

	::-webkit-scrollbar {
		display: none;
	}
`;

const HourDetail = styled.div`
	width: 90%;
	max-height: 90%;
	padding: 1.5rem;
	position: absolute;
	margin: auto;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	z-index: 10;
	background: hsl(0, 0%, 100%, 0.2);
	box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(25px);
	-webkit-backdrop-filter: blur(25px);
	border-radius: 10px;
	border: 1px solid hsl(0, 0%, 100%, 0.2);

	.hourlydtl__close {
		position: absolute;
		top: 1.5rem;
		right: 1rem;
		cursor: pointer;
	}

	.hourlydtl {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-top: 2rem;
	}

	.hourlydtl__title {
		h2 {
			font-weight: 700;
		}
	}

	.hourlydtl__top {
		width: 100%;
		display: flex;
		flex-direction: column;

		&__desc {
			width: 100%;

			h3 {
				text-transform: uppercase;
				text-align: center;
				font-weight: 700;
			}
		}

		&__weather {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			margin: 0 auto;

			img {
				height: 8rem;
				width: 8rem;
			}

			h2 {
				font-size: 3.5rem;
				font-weight: 700;
			}
		}
	}

	.hourlydtl__bottom {
		display: flex;
		margin-bottom: 3rem;

		&__info {
			display: flex;
			flex-wrap: wrap;
			margin-top: 1rem;

			& > * {
				flex: 1 1 112px;
				margin: 0.25rem;
			}

			svg,
			h6 {
				margin-right: 0.75rem;
			}

			&__icons {
				display: flex;
				height: 48px;
				align-items: center;
			}
		}
	}

	.hourlydtl__nav__prev {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
	}

	.hourlydtl__nav__next {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}

	@media (min-width: 500px) {
		max-width: 460px;

		.hourlydtl__bottom {
			width: 90%;
			margin: 1rem auto;

			&__info__icons {
				height: 64px;
				margin-top: 1rem;

				p {
					font-size: 0.9rem;
				}
			}
		}
	}

	@media (max-height: 700px) {
		.hourlydtl__bottom__info__icons {
			height: 44px;
		}
	}

	@media (min-height: 1000px) {
		height: 650px;
	}
`;

export default HourlyDetail;
