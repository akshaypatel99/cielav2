import styled from 'styled-components';

const Loading = () => {
	return (
		<StyledLoading>
			<p>Loading...</p>
		</StyledLoading>
	);
};

export default Loading;

const StyledLoading = styled.div`
	display: flex;
	justify-content: center;
	margin: 5rem 0;
`;
