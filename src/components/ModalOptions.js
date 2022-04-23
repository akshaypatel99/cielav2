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
	const { status, alerts, timezoneOffset } = weather;

	useEffect(() => {
		if (status === 'resolved' && weather) {
			setShowSearchModal(false);
		}
	}, [status, weather]);

	return (
		<>
			<StyledOptions>
				<StyledWeatherAlertIcon searchIsOpen={showSearchModal}>
					{!showAlert && (
						<AlertModalIcon
							size={22}
							aria-label='open weather warning'
							tabIndex='1'
							onClick={() => setShowAlert(!showAlert)}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									setShowAlert(!showAlert);
								}
							}}
						/>
					)}
				</StyledWeatherAlertIcon>

				<StyledSearchIcon alertIsOpen={showAlert}>
					{!showSearchModal && (
						<SearchModalIcon
							tabIndex='2'
							size={22}
							onClick={() => setShowSearchModal(!showSearchModal)}
							onKeyUp={(event) => {
								if (event.key === 'Enter') {
									setShowSearchModal(!showSearchModal);
								}
							}}
							aria-label='open search modal'
						/>
					)}
				</StyledSearchIcon>
			</StyledOptions>
			{showAlert && (
				<AlertModal
					alerts={alerts}
					timezoneOffset={timezoneOffset}
					showAlert={showAlert}
					setShowAlert={setShowAlert}
				/>
			)}
			{showSearchModal && (
				<SearchModal
					showSearchModal={showSearchModal}
					setShowSearchModal={setShowSearchModal}
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

const StyledWeatherAlertIcon = styled.div`
	display: ${(props) => (props.searchIsOpen ? 'none' : 'flex')};
	margin-left: 0;
	margin-right: auto;
`;

const StyledSearchIcon = styled.div`
	display: ${(props) => (props.alertIsOpen ? 'none' : 'flex')};
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
