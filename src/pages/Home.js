import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useWeather } from '../context/WeatherContext';
import Header from '../components/Header';
import Search from '../components/Search';
import DailyDetail from '../components/DailyDetail';
import HourlyDetail from '../components/HourlyDetail';
import Results from '../components/Results';

export default function Home() {
	const [showSearch, setShowSearch] = useState(true);
	const { weatherState } = useWeather();
	const { status, weather } = weatherState;

	const location = useLocation();
	const pathId = location.pathname.split('/')[2];
	const pathDiv = location.pathname.split('/')[1];

	useEffect(() => {
		if (status === 'resolved' && weather) {
			setShowSearch(false);
		}
	}, [status, weather]);

	return (
		<StyledHome>
			{pathDiv === 'daily' && pathId && (
				<DailyDetail pathId={pathId} />
			)}
			{pathDiv === 'hourly' && pathId && (
				<HourlyDetail pathId={pathId} />
			)}

			<Header />
			<Search showSearch={showSearch} />
			<Results />
		</StyledHome>
	);
}

const StyledHome = styled.div`
	width: 430px;
	height: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-image: linear-gradient(
		140deg,
		#1e3c72 0%,
		#1e3c72 20%,
		#2a5298 100%
	);
	overflow-y: scroll;
	position: relative;
`;
