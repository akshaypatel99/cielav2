import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWeather } from '../context/WeatherContext';
import { FiAlertTriangle, FiSearch } from 'react-icons/fi';
import SearchModal from '../components/SearchModal';
import AlertModal from './AlertModal';

const ModalOptions = () => {
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const { weatherState } = useWeather();
	const { weather } = weatherState;
	const { status } = weather;

	useEffect(() => {
		if (status === 'resolved' && weather) {
			setShowSearchModal(false);
		}
	}, [status, weather]);

	function toggleAlertModal() {
		setShowAlert(!showAlert);
	}

	function toggleSearchModal() {
		setShowSearchModal(!showSearchModal);
	}

	return (
		<>
			<StyledOptions>
				<WeatherAlertButton onClick={toggleAlertModal}>
					<AlertModalIcon
						size={22}
						aria-label='open weather warning'
					/>
				</WeatherAlertButton>

				<SearchButton onClick={toggleSearchModal}>
					<SearchModalIcon
						size={22}
						aria-label='open search modal'
					/>
				</SearchButton>
			</StyledOptions>

			{showAlert && (
				<AlertModal
					showAlert={showAlert}
					toggleAlert={toggleAlertModal}
				/>
			)}

			{showSearchModal && (
				<SearchModal
					showSearchModal={showSearchModal}
					toggleSearchModal={toggleSearchModal}
				/>
			)}
		</>
	);
};

export default ModalOptions;

const StyledOptions = styled.div`
	width: 90%;
	display: flex;
	margin-top: 1rem;
`;

const WeatherAlertButton = styled.button`
	margin-left: 0;
	margin-right: auto;
`;

const SearchButton = styled.button`
	margin-left: auto;
	margin-right: 0;
`;

const AlertModalIcon = styled(FiAlertTriangle)`
	color: white;
	cursor: pointer;
`;

const SearchModalIcon = styled(FiSearch)`
	color: white;
	cursor: pointer;
`;
