import styled from 'styled-components';

export default function ErrorMessage({ error }) {
	return (
		<StyledErrorMessage>
			<h4>Error:</h4>
			<p>{error.message}</p>
		</StyledErrorMessage>
	);
}

const StyledErrorMessage = styled.div`
	width: 100%;
	margin: 5rem auto;

	h4 {
		margin-bottom: 1rem;
	}
`;
