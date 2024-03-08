import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import AlertMessage from './AlertMessage';
import CloseButton from './CloseButton';
import Modal from './Modal';
import { useWeather } from '../context/WeatherContext';

const AlertModal = ({ showAlert, toggleAlert }) => {
	const { weatherState } = useWeather();
	const { weather } = weatherState;
	const { alerts, timezoneOffset } = weather;
	const closeRef = useRef();

	useEffect(() => {
		closeRef.current.focus();
	}, []);

	let message;

	if (Array.isArray(alerts)) {
		message = alerts.map((alert, index) => (
			<AlertMessage
				key={alert.start + index}
				alert={alert}
				timezoneOffset={timezoneOffset}
			/>
		));
	} else {
		message = <h5>{alerts}</h5>;
	}

	return (
		<Modal
			openModal={showAlert}
			closeModal={toggleAlert}>
			<AlertContainer>
				<AlertHeader>
					<div className='spacer' />
					<AlertTitle>Weather Warning</AlertTitle>
					<CloseButton
						onClick={toggleAlert}
						ref={closeRef}
					/>
				</AlertHeader>
				<StyledAlert>{message}</StyledAlert>
			</AlertContainer>
		</Modal>
	);
};

export default AlertModal;

const AlertContainer = styled.div`
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	height: 100%;
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 180px auto;
`;

const AlertHeader = styled.div`
	display: flex;
	width: 90%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;

	.spacer {
		width: 32px;
		height: 35px;
	}
`;

const AlertTitle = styled.h3`
	font-size: 1.1rem;
	font-family: 'SofiaProRegular';
	flex: 1;
	text-align: center;
`;

const StyledAlert = styled.div`
	padding: 0 2rem 2rem;
	overflow: auto;
	position: relative;
	z-index: 10;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;
