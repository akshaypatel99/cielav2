import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import Search from '../components/Search';
import { useWeather } from '../context/WeatherContext';
import Currently from '../components/Currently';
import Hourly from '../components/Hourly';
import Daily from '../components/Daily';
import Minutely from '../components/Minutely';
import DailyDetail from '../components/DailyDetail';
import HourlyDetail from '../components/HourlyDetail';
import Loading from '../components/Loading';
import ModalOptions from '../components/ModalOptions';

export default function Home() {
	const [showSearch, setShowSearch] = useState(true);
	const { weatherState } = useWeather();
	const { status, weather, error } = weatherState;

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
			{pathDiv === 'daily' && pathId && <DailyDetail pathId={pathId} />}
			{pathDiv === 'hourly' && pathId && <HourlyDetail pathId={pathId} />}

			<Header />
			<Search showSearch={showSearch} />
			<Results>
				{status === 'loading' && <Loading />}
				{status === 'rejected' && error && <ErrorMessage error={error} />}
				{status === 'resolved' && weather && (
					<>
						<ModalOptions />
						<Currently />
						<Hourly />
						<Daily />
						<Minutely />
					</>
				)}
			</Results>
		</StyledHome>
	);
}

const StyledHome = styled.div`
	width: 420px;
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

const Results = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;
