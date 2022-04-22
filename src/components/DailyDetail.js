import { useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { formatTime, formatDayDate } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import styled from 'styled-components';
import { useWeather } from '../context/WeatherContext';
import { FiChevronsLeft, FiChevronsRight, FiX } from 'react-icons/fi';

const DailyDetail = ({ pathId }) => {
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
		<>
			<CardShadow className='shadow' onClick={exitDetailHandler}>
				<DayDetail>
					<>
						<div className='dailydtl__title'>
							<h2>{formatDayDate(day.dt, timezoneOffset)}</h2>
						</div>

						<div
							className='dailydtl__close'
							ref={closeRef}
							tabIndex='5'
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									navigate('/');
								}
							}}
						>
							<FiX onClick={() => navigate('/')} />
						</div>

						<div className='dailydtl'>
							<div className='dailydtl__top'>
								<div className='dailydtl__top__desc'>
									<h3>{day.weather[0].description}</h3>
								</div>

								<div className='dailydtl__top__weather'>
									<div className='dailydtl__top__weather__icon'>
										<img
											src={convertIcon(day.weather[0].icon)}
											alt={day.weather[0].main}
										/>
									</div>
									<div className='dailydtl__top__weather__temp'>
										<h2>
											<span>{Math.round(day.temp.max)}&#176;C</span>
										</h2>
										<h2>{Math.round(day.temp.min)}&#176;C</h2>
									</div>
								</div>
							</div>
							<div className='dailydtl__bottom'>
								<div className='dailydtl__bottom__info'>
									<div className='dailydtl__bottom__info__icons'>
										<h6>{formatTime(day.sunrise, timezoneOffset)}</h6>
									</div>
									<div className='dailydtl__bottom__info__icons'>
										<h6>{formatTime(day.sunset, timezoneOffset)}</h6>
									</div>
									<div className='dailydtl__bottom__info__icons'>
										<h6>UV Index: {day.uvi}</h6>
									</div>

									<div className='dailydtl__bottom__info__icons'>
										<h6>{day.clouds}% cloudy</h6>
									</div>

									<div className='dailydtl__bottom__info__icons'>
										<h6>{(day.pop * 100).toFixed(0)}% chance of rain</h6>
									</div>

									<div className='dailydtl__bottom__info__icons'>
										<h6>{day.humidity}% humidity</h6>
									</div>

									<div className='dailydtl__bottom__info__icons'>
										<h6>Pressure: {day.pressure} hPa</h6>
									</div>

									<div className='dailydtl__bottom__info__icons'>
										<h6 className='wind'>
											{Math.round(day.wind_speed * 2.237).toFixed(0)} mph{' '}
											{convertWindDirection(day.wind_deg)} wind
										</h6>
									</div>

									<div className='dailydtl__bottom__info__temp__feel'>
										<div className='temp'>
											<h6>Temperature:</h6>
											<h6>Day: {day.temp.day.toFixed(1)}&#176;C</h6>
											<h6>Eve: {day.temp.eve.toFixed(1)}&#176;C</h6>
											<h6>Morn: {day.temp.morn.toFixed(1)}&#176;C</h6>
											<h6>Night: {day.temp.night.toFixed(1)}&#176;C</h6>
										</div>
										<div className='feel'>
											<h6>Feels Like:</h6>
											<h6>Day: {day.feels_like.day.toFixed(1)}&#176;C</h6>
											<h6>Eve: {day.feels_like.eve.toFixed(1)}&#176;C</h6>
											<h6>Morn: {day.feels_like.morn.toFixed(1)}&#176;C</h6>
											<h6>Night: {day.feels_like.night.toFixed(1)}&#176;C</h6>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='dailydtl__nav__prev'>
							{index > 0 && (
								<Link to={`/daily/${day.dt - 86400}`}>
									<FiChevronsLeft />
								</Link>
							)}
						</div>
						<div className='dailydtl__nav__next'>
							{index < 7 && (
								<Link to={`/daily/${day.dt + 86400}`}>
									<FiChevronsRight />
								</Link>
							)}
						</div>
					</>
				</DayDetail>
			</CardShadow>
		</>
	);
};

const CardShadow = styled.div`
	width: 100%;
	height: 100%;
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

const DayDetail = styled.div`
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

	.dailydtl__title {
		h2 {
			text-transform: uppercase;
			font-weight: 700;
		}
	}

	.dailydtl__close {
		position: absolute;
		top: 1.5rem;
		right: 1rem;
		cursor: pointer;
	}

	.dailydtl {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2rem;
	}

	.dailydtl__top {
		width: 100%;
		min-height: 170px;
		display: flex;
		flex-direction: column;

		&__desc {
			h3 {
				text-transform: uppercase;
				text-align: center;
				font-weight: 700;
			}
		}

		&__weather {
			display: flex;
			justify-content: space-around;
			margin-top: 1rem;
			padding: 0.5rem;

			&__icon {
				img {
					height: 8rem;
					width: 8rem;
				}
			}

			&__temp {
				display: flex;
				flex-direction: column;
				margin-left: 0.5rem;
				text-align: right;

				h2 {
					font-size: 3rem;
					font-weight: 400;

					span {
						font-weight: 700;
					}
				}
			}
		}
	}

	.dailydtl__bottom {
		display: flex;
		width: 90%;
		margin: 0 auto 2rem;

		&__info {
			display: flex;
			flex-wrap: wrap;
			margin-top: 1rem;

			& > * {
				flex: 1 1 112px;
			}

			svg,
			h6 {
				margin-right: 0.75rem;
			}

			&__icons {
				display: flex;
				height: 44px;
				margin-bottom: 0.75rem;
				align-items: center;
			}

			&__temp__feel {
				display: flex;
				width: 100%;
				justify-content: space-around;

				.temp,
				.feel {
					min-width: 120px;

					h6 {
						margin-top: 0.5rem;
					}
				}
			}
		}
	}

	.dailydtl__nav__prev {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
	}

	.dailydtl__nav__next {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}

	@media (min-width: 500px) {
		max-width: 460px;

		.dailydtl__bottom {
			width: 90%;
			margin: 1rem auto;

			&__info {
				&__icons {
					/* height: 60px; */

					p {
						font-size: 0.9rem;
					}
				}

				&__temp__feel {
					padding-bottom: 1rem;
				}
			}
		}
	}

	@media (max-height: 800px) {
		.dailydtl__bottom__info__temp__feel {
			display: none;
		}
	}

	@media (min-height: 1000px) {
		height: 700px;
	}
`;

export default DailyDetail;
