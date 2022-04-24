import styled from 'styled-components';
import { formatDayDate } from '../utils/convertUnixTime';

const AlertMessage = ({ alert, timezoneOffset }) => {
	return (
		<Message>
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
				<p className='content'>{formatDayDate(alert.start, timezoneOffset)}</p>
			</MessageContent>
			<MessageContent>
				<p>End: </p>
				<p className='content'>{formatDayDate(alert.end, timezoneOffset)}</p>
			</MessageContent>
			<MessageContent>
				<p>Description: </p>
				<p className='content'>{alert.description}</p>
			</MessageContent>
			<MessageContent>
				<p>Tags: </p>
				{alert.tags.map((tag, index) => (
					<p key={index} className='content'>
						{tag}
					</p>
				))}
			</MessageContent>
		</Message>
	);
};

export default AlertMessage;

const Message = styled.div`
	max-width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 1.25rem;
	border-bottom: 1px solid hsla(0, 0%, 100%, 0.5);
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
