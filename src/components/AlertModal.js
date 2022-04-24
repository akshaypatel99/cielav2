import { useEffect } from 'react';
import styled from 'styled-components';
import AlertMessage from './AlertMessage';
import CloseButton from './CloseButton';
import ModalBackdrop from './ModalBackdrop';

const AlertModal = ({ alerts, timezoneOffset, showAlert, setShowAlert }) => {
	useEffect(() => {
		function onKeyDown(event) {
			const escape = event.key === 'Escape';
			if (escape) {
				setShowAlert(!showAlert);
			}
		}
		document.body.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.removeEventListener('keydown', onKeyDown);
		};
	}, [setShowAlert, showAlert]);

	const closeAlertModal = () => {
		setShowAlert(!showAlert);
	};

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
		<ModalBackdrop>
			<AlertContainer>
				<AlertHeader>
					<div className='spacer' />
					<AlertTitle>Weather Warning</AlertTitle>
					<CloseButton onClick={closeAlertModal} />
				</AlertHeader>
				<StyledAlert>{message}</StyledAlert>
			</AlertContainer>
		</ModalBackdrop>
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
	grid-template-rows: 144px auto;
`;

const AlertHeader = styled.div`
	display: flex;
	width: 80%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;

	.spacer {
		width: 22px;
		height: 22px;
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
