import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Modal = ({ openModal, closeModal, children }) => {
	const ref = useRef();

	useEffect(() => {
		if (openModal) {
			ref.current?.showModal();
		} else {
			ref.current?.close();
		}
	}, [openModal]);

	return (
		<Dialog
			ref={ref}
			onCancel={closeModal}>
			{children}
		</Dialog>
	);
};

export default Modal;

const Dialog = styled.dialog`
	display: flex;
	align-self: center;
	justify-self: center;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	background-color: transparent;
	border: transparent;

	:modal {
		max-width: 100vw;
		max-height: 100vh;
	}

	::backdrop {
		background: hsla(219, 58%, 28%, 0.95);
	}
`;
