import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useWeather } from '../context/WeatherContext';
import Search from './Search';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import CloseButton from './CloseButton';
import Modal from './Modal';

const SearchModal = ({ showSearchModal, toggleSearchModal }) => {
	const { weatherState } = useWeather();
	const { status, error } = weatherState;
	const closeRef = useRef();

	useEffect(() => {
		closeRef.current.focus();
	}, []);

	return (
		<Modal
			openModal={showSearchModal}
			closeModal={toggleSearchModal}>
			<SearchModalContainer>
				<SearchHeader>
					<div className='spacer' />
					<SearchTitle>Search</SearchTitle>
					<CloseButton
						ref={closeRef}
						onClick={toggleSearchModal}
					/>
				</SearchHeader>
				<Search showSearch={true} />
				{status === 'loading' && <Loading />}
				{status === 'rejected' && error && (
					<ErrorMessage error={error} />
				)}
			</SearchModalContainer>
		</Modal>
	);
};

export default SearchModal;

const SearchModalContainer = styled.div`
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	height: 100%;
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 180px auto;
`;

const SearchHeader = styled.div`
	display: flex;
	width: 90%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;

	.spacer {
		width: 32px;
		height: 35px;
	}
`;

const SearchTitle = styled.h3`
	font-size: 1.1rem;
	font-weight: 400;
	flex: 1;
	text-align: center;
`;
