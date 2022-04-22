import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ErrorMessage from '../components/Error';
import Header from '../components/Header';
import Search from '../components/Search';
import { useWeather } from '../context/WeatherContext';
import { IoIosSearch } from 'react-icons/io';
import Currently from '../components/Currently';
import Hourly from '../components/Hourly';
import Daily from '../components/Daily';
import Minutely from '../components/Minutely';
import DailyDetail from '../components/DailyDetail';
import HourlyDetail from '../components/HourlyDetail';

export default function Home() {
	const [showSearch, setShowSearch] = useState(true);
	const { weatherState } = useWeather();
	const { status, weather, error } = weatherState;

	let params = useParams();

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
			{!showSearch && <SearchIcon onClick={() => setShowSearch(!showSearch)} />}
			{showSearch && <Search />}
			<Results>
				{status === 'loading' && <p>Loading...</p>}
				{status === 'rejected' && error && <ErrorMessage error={error} />}
				{status === 'resolved' && weather && (
					<>
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
	height: 900px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-image: linear-gradient(
		140deg,
		#1e3c72 0%,
		#1e3c72 1%,
		#2a5298 100%
	);
	overflow-y: scroll;
	filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
		drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))
		drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
	position: relative;
`;

const SearchIcon = styled(IoIosSearch)`
	position: absolute;
	top: 5rem;
	right: 1rem;
	font-size: 1.75rem;
	color: white;
	margin-right: 1rem;
	cursor: pointer;
`;

const Results = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;
