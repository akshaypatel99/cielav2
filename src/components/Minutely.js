import React from 'react';
import styled from 'styled-components';
import { useWeather } from '../context/WeatherContext';
import { formatTime } from '../utils/convertUnixTime';
import { rainfall, rainfallKey } from '../utils/rainfall';

const Minutely = () => {
	const { weatherState } = useWeather();
	const { weather } = weatherState;
	const { minutely, timezoneOffset } = weather;

	return (
		<>
			<StyledMinutely>
				<MinutelyContainer>
					<MinutelyChart>
						<Scale>
							<div className='increments'>
								<p>Now</p>
							</div>
							<div className='increments'>
								<p>15</p>
							</div>
							<div className='increments'>
								<p>30</p>
							</div>
							<div className='increments'>
								<p>45</p>
							</div>
							<div className='increments'>
								<p>60</p>
							</div>
						</Scale>
						<Chart>
							{minutely &&
								minutely.map((dp, index) => {
									if (dp.precipitation > 0) {
										return (
											<MinutelyDataPoint
												key={dp.dt}
												style={{
													background: `${rainfall(dp.precipitation)}`,
												}}
											></MinutelyDataPoint>
										);
									} else {
										return (
											<MinutelyDataPoint
												key={dp.dt}
												style={{
													background: 'hsla(190, 100%, 100%, 0.2)',
												}}
											></MinutelyDataPoint>
										);
									}
								})}
						</Chart>
						<Scale>
							<div className='increments'>
								<p>{formatTime(minutely[0].dt, timezoneOffset)}</p>
							</div>
							<div className='increments'>
								<p>{formatTime(minutely[15].dt, timezoneOffset)}</p>
							</div>
							<div className='increments'>
								<p>{formatTime(minutely[30].dt, timezoneOffset)}</p>
							</div>
							<div className='increments'>
								<p>{formatTime(minutely[45].dt, timezoneOffset)}</p>
							</div>
							<div className='increments'>
								<p>{formatTime(minutely[60].dt, timezoneOffset)}</p>
							</div>
						</Scale>
						<Key>
							<KeyHeader>
								<p>Rainfall (mm/hr)</p>
							</KeyHeader>

							<KeyContainer>
								{rainfallKey.map((el) => (
									<KeySquare key={el.color}>
										<div
											className='color'
											style={{
												background: `${el.color}`,
											}}
										></div>
										<div className='amount'>
											<p>{el.amount}</p>
										</div>
										<div className='description'>
											<p>{el.description}</p>
										</div>
									</KeySquare>
								))}
							</KeyContainer>
						</Key>
					</MinutelyChart>
				</MinutelyContainer>
			</StyledMinutely>
		</>
	);
};

export default Minutely;

const StyledMinutely = styled.div`
	width: 100%;
	margin: 1rem auto;
	padding-bottom: 1rem;

	p {
		font-weight: 400;
		font-size: 0.9rem;
	}
`;

const MinutelyContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0.5rem;
	margin: 0 auto;
`;

const MinutelyChart = styled.div`
	display: flex;
	flex-direction: column;
`;

const Scale = styled.div`
	display: flex;
	justify-content: space-between;

	.increments {
		p {
			font-size: 0.8rem;
		}
	}
`;

const Chart = styled.div`
	width: 100%;
	display: flex;
	overflow-x: scroll;
	margin: 0.25rem 0;
`;

const MinutelyDataPoint = styled.div`
	width: 100%;
	min-height: 42px;
	min-width: 4px;
`;

const Key = styled.div`
	margin-top: 1rem;
`;

const KeyHeader = styled.div`
	p {
		font-weight: 300;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
`;

const KeyContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
`;

const KeySquare = styled.div`
	.color {
		min-height: 10px;
		margin-bottom: 0.25rem;
	}

	.amount {
		margin-bottom: 0.125rem;
	}

	.description {
		margin-bottom: 0.5rem;

		p {
			font-size: 0.75rem;
			font-weight: 300;
			text-transform: uppercase;
		}
	}
`;
