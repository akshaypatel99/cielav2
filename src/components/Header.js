import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
	const today = new Date().toLocaleDateString('en-GB', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	});

	return (
		<StyledHeader>
			<Link to='/'>
				<h1>Ciela</h1>
			</Link>
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

	a {
		text-decoration: none;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 200;
		font-family: 'SofiaProExtraLight';
		margin-bottom: 0.75rem;
	}

	p {
		font-weight: 400;
		font-family: 'SofiaProRegular';
	}
`;
