import styled from 'styled-components';

export default function ErrorMessage({ children, error }) {
	return (
		<StyledErrorMessage>
			<h4>Error:</h4>
			<p>{error?.message}</p>
			<p>{error?.response?.data.message}</p>
			{children}
		</StyledErrorMessage>
	);
}

const StyledErrorMessage = styled.div`
	width: 100%;
	margin: 2rem auto;
	padding: 3rem 0;

	h4 {
		margin-bottom: 1rem;
	}

	p {
		line-height: 1.5;
		margin-bottom: 0.5rem;
	}
`;
