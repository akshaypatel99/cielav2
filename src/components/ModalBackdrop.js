import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalBackdrop = ({ children, path }) => {
	const navigate = useNavigate();

	const exitDetailHandler = (e) => {
		const element = e.target;
		if (element.classList.contains('shadow')) {
			document.body.style.overflow = 'auto';
			navigate('/');
		}
	};

	return (
		<StyledModalBackdrop className='shadow' onClick={exitDetailHandler}>
			{children}
		</StyledModalBackdrop>
	);
};

export default ModalBackdrop;

const StyledModalBackdrop = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	background: hsla(219, 58%, 28%, 0.9);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;

	::-webkit-scrollbar {
		display: none;
	}
`;
