import { useEffect } from 'react';
import styled from 'styled-components';
import { useWeather } from '../context/WeatherContext';
import Search from './Search';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import CloseButton from './CloseButton';
import ModalBackdrop from './ModalBackdrop';

const SearchModal = ({ showSearchModal, setShowSearchModal }) => {
	const { weatherState } = useWeather();
	const { status, error } = weatherState;

	const closeSearchModal = () => {
		setShowSearchModal(!showSearchModal);
	};

	useEffect(() => {
		function onKeyDown(event) {
			const escape = event.key === 'Escape';
			if (escape) {
				setShowSearchModal(!showSearchModal);
			}
		}
		document.body.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.removeEventListener('keydown', onKeyDown);
		};
	}, [setShowSearchModal, showSearchModal]);

	return (
		<ModalBackdrop>
			<SearchModalContainer>
				<SearchHeader>
					<div className='spacer' />
					<SearchTitle>Search</SearchTitle>
					<CloseButton onClick={closeSearchModal} />
				</SearchHeader>
				<Search showSearch={true} />
				{status === 'loading' && <Loading />}
				{status === 'rejected' && error && <ErrorMessage error={error} />}
			</SearchModalContainer>
		</ModalBackdrop>
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
	grid-template-rows: 144px auto;
`;

const SearchHeader = styled.div`
	display: flex;
	width: 80%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;

	.spacer {
		width: 22px;
		height: 22px;
	}
`;

const SearchTitle = styled.h3`
	font-size: 1.1rem;
	font-family: 'SofiaProRegular';
	flex: 1;
	text-align: center;
`;
