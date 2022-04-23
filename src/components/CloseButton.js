import React from 'react';
import { FiX } from 'react-icons/fi';
import styled from 'styled-components';

const CloseButton = React.forwardRef(({ onClick }, ref) => (
	<StyledCloseButton
		tabIndex='2'
		aria-label='Close modal'
		onClick={onClick}
		ref={ref}
	>
		<CloseSearchModalIcon size={22} />
	</StyledCloseButton>
));

export default CloseButton;

const StyledCloseButton = styled.button`
	background: transparent;
	border: none;
`;

const CloseSearchModalIcon = styled(FiX)`
	color: white;
	cursor: pointer;
`;
