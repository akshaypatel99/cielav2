import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ErrorMessage from '../components/Error';
import Header from '../components/Header';
import Search from '../components/Search';
import { useWeather } from '../context/WeatherContext';
import { FiSearch, FiX } from 'react-icons/fi';
import Currently from '../components/Currently';
import Hourly from '../components/Hourly';
import Daily from '../components/Daily';
import Minutely from '../components/Minutely';
import DailyDetail from '../components/DailyDetail';
import HourlyDetail from '../components/HourlyDetail';
import SearchModal from '../components/SearchModal';

export default function Home() {
	const [showSearch, setShowSearch] = useState(true);
	const [showSearchModal, setShowSearchModal] = useState(false);
	const { weatherState } = useWeather();
	const { status, weather, error } = weatherState;

	const location = useLocation();
	const pathId = location.pathname.split('/')[2];
	const pathDiv = location.pathname.split('/')[1];

	useEffect(() => {
		if (status === 'resolved' && weather) {
			setShowSearch(false);
			setShowSearchModal(false);
		}
	}, [status, weather]);

	return (
		<StyledHome>
			{pathDiv === 'daily' && pathId && <DailyDetail pathId={pathId} />}
			{pathDiv === 'hourly' && pathId && <HourlyDetail pathId={pathId} />}

			<Header />
			{status === 'resolved' && !showSearchModal && (
				<SearchIcon
					size={18}
					onClick={() => setShowSearchModal(!showSearchModal)}
				/>
			)}
			{showSearchModal && (
				<CloseIcon
					size={18}
					onClick={() => setShowSearchModal(!showSearchModal)}
				/>
			)}
			{showSearchModal && <SearchModal />}

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
	min-height: 900px;
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

const SearchIcon = styled(FiSearch)`
	position: absolute;
	top: 6rem;
	right: 1rem;
	font-size: 1.75rem;
	color: white;
	margin-right: 1rem;
	cursor: pointer;
`;

const CloseIcon = styled(FiX)`
	position: absolute;
	top: 6rem;
	right: 1rem;
	font-size: 1.75rem;
	color: white;
	margin-right: 1rem;
	cursor: pointer;
	z-index: 50;
`;

const Results = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
