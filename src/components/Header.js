import React from 'react';
import styled from 'styled-components';

const Header = () => {
	const today = new Date().toLocaleDateString('en-GB', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	});

	return (
		<StyledHeader>
			<h1>Ciela</h1>
			<p>{today}</p>
		</StyledHeader>
	);
};

export default Header;

const StyledHeader = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 1vh;

	h1 {
		font-size: 1.5rem;
		font-weight: 200;
		margin-bottom: 0.75rem;
	}

	p {
		font-weight: 400;
	}
`;
