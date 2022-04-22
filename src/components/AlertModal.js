import { useEffect } from 'react';
import styled from 'styled-components';
import { formatDayDate } from '../utils/convertUnixTime';

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

	let message;

	if (Array.isArray(alerts)) {
		message = alerts.map((alert) => (
			<Message key={alert.start}>
				<MessageContent>
					<p>Sender: </p>
					<h6>{alert.sender_name}</h6>
				</MessageContent>
				<MessageContent>
					<p>Event: </p>
					<h6>{alert.event}</h6>
				</MessageContent>
				<MessageContent>
					<p>Start: </p>
					<h6>{formatDayDate(alert.start, timezoneOffset)}</h6>
				</MessageContent>
				<MessageContent>
					<p>End: </p>
					<h6>{formatDayDate(alert.end, timezoneOffset)}</h6>
				</MessageContent>
				<MessageContent>
					<p>Description: </p>
					<p>{alert.description}</p>
				</MessageContent>
			</Message>
		));
	} else {
		message = <h5>{alerts}</h5>;
	}

	return (
		<CardShadow>
			<StyledAlert>{message}</StyledAlert>
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
	display: flex;
	flex-direction: column;
	align-items: center;

	::-webkit-scrollbar {
		display: none;
	}
`;

const StyledAlert = styled.div`
	width: 90%;
	padding: 0.5rem;
	position: absolute;
	margin: 20vh auto 0;
	z-index: 10;
	display: flex;
	justify-content: center;
`;

const Message = styled.div`
	max-width: 100%;
	display: flex;
	flex-direction: column;
`;

const MessageContent = styled.div`
	display: flex;

	p {
		margin-right: 1rem;
	}
`;
