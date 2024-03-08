import React from 'react';
import { FiX } from 'react-icons/fi';
import styled from 'styled-components';

const CloseButton = React.forwardRef(({ onClick }, ref) => (
	<StyledCloseButton
		aria-label='Close modal'
		onClick={onClick}
		ref={ref}>
		<CloseSearchModalIcon size={22} />
	</StyledCloseButton>
));

export default CloseButton;

const StyledCloseButton = styled.button`
	padding: 0.25rem;
`;

const CloseSearchModalIcon = styled(FiX)`
	color: white;
	cursor: pointer;
`;
