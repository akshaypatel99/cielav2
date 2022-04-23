import { useEffect } from 'react';
import styled from 'styled-components';
import { formatDayDate } from '../utils/convertUnixTime';
import CloseButton from './CloseButton';

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
			<Message key={alert.start + index}>
				<MessageContent>
					<p>Sender: </p>
					<p className='content'>{alert.sender_name}</p>
				</MessageContent>
				<MessageContent>
					<p>Event: </p>
					<p className='content'>{alert.event}</p>
				</MessageContent>
				<MessageContent>
					<p>Start: </p>
					<p className='content'>
						{formatDayDate(alert.start, timezoneOffset)}
					</p>
				</MessageContent>
				<MessageContent>
					<p>End: </p>
					<p className='content'>{formatDayDate(alert.end, timezoneOffset)}</p>
				</MessageContent>
				<MessageContent>
					<p>Description: </p>
					<p className='content'>{alert.description}</p>
				</MessageContent>
			</Message>
		));
	} else {
		message = <h5>{alerts}</h5>;
	}

	return (
		<CardShadow>
			<AlertContainer>
				<AlertHeader>
					<div className='spacer' />
					<AlertTitle>Weather Warning</AlertTitle>
					<CloseButton onClick={closeAlertModal} />
				</AlertHeader>
				<StyledAlert>{message}</StyledAlert>
			</AlertContainer>
		</CardShadow>
	);
};

export default AlertModal;

const CardShadow = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	background: hsla(219, 58%, 28%, 0.95);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;

	::-webkit-scrollbar {
		display: none;
	}
`;

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

	& > * {
		margin-bottom: 1rem;
	}
`;

const Message = styled.div`
	max-width: 100%;
	display: flex;
	flex-direction: column;
`;

const MessageContent = styled.div`
	display: flex;
	margin-bottom: 0.25rem;

	p {
		font-size: 0.9rem;
	}

	.content {
		font-family: 'SofiaProLight';
		margin-left: 1rem;
	}
`;
