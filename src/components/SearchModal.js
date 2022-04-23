import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';
import { getCityWeather, getCoordsWeather } from '../context/weatherReducer';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import CloseButton from './CloseButton';

const SearchModal = ({ showSearchModal, setShowSearchModal }) => {
	const [showSearchInput, setShowSearchInput] = useState(false);
	const [inputError, setInputError] = useState('');
	const [city, setCity] = useState('');
	const { weatherState, dispatch } = useWeather();
	const { status, error } = weatherState;
	const inputRef = useRef();

	const handleCoords = (e) => {
		e.preventDefault();
		getCoordsWeather()(dispatch);
	};

	const handleCity = (e) => {
		e.preventDefault();
		if (city.length > 0) {
			getCityWeather(city)(dispatch);
		} else {
			setInputError('Please enter a valid city');
		}
	};

	const toggleSearchInput = () => {
		if (showSearchInput) {
			setShowSearchInput(false);
			setCity('');
			setInputError('');
		} else {
			setShowSearchInput(true);
		}
	};

	const closeSearchModal = () => {
		setShowSearchModal(!showSearchModal);
		setCity('');
		setInputError('');
	};

	useEffect(() => {
		if (showSearchInput) {
			inputRef.current.focus();
		}

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
	}, [showSearchInput, setShowSearchModal, showSearchModal]);

	return (
		<CardShadow>
			<SearchModalContainer>
				<SearchHeader>
					<div className='spacer' />
					<SearchTitle>Search</SearchTitle>
					<CloseButton onClick={closeSearchModal} />
				</SearchHeader>
				<StyledSearch>
					<SearchOptions>
						<SearchOption
							tabIndex='3'
							onClick={handleCoords}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									handleCoords();
								}
							}}
						>
							<FiMapPin color='#fff' size={28} />
							<p>Location</p>
						</SearchOption>

						<div className='vl'></div>

						<SearchOption
							aria-label='Search by city'
							tabIndex='4'
							onClick={() => toggleSearchInput()}
							onKeyUp={(event) => {
								if (event.key === 'Enter') {
									toggleSearchInput();
								}
							}}
						>
							<FiSearch color='#fff' size={28} />
							<p>Search</p>
						</SearchOption>
					</SearchOptions>
					{showSearchInput && (
						<SearchInput>
							<form onSubmit={handleCity}>
								<input
									name='city'
									type='text'
									placeholder='Enter city & country'
									value={city}
									onChange={(event) => setCity(event.target.value)}
									ref={inputRef}
									tabIndex='5'
									onKeyDown={(event) => {
										if (event.key === 'Escape') {
											toggleSearchInput();
										}
									}}
								/>
								<button
									onClick={handleCity}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											handleCity(city);
										}
									}}
									onTouchStart={handleCity}
									type='submit'
								>
									Get Weather
								</button>
							</form>
							<p>For best results, enter postcode, city & country.</p>
						</SearchInput>
					)}
					{inputError && <ErrorMessage>{inputError}</ErrorMessage>}
					{status === 'loading' && <Loading />}
					{status === 'rejected' && error && <ErrorMessage error={error} />}
				</StyledSearch>
			</SearchModalContainer>
		</CardShadow>
	);
};

export default SearchModal;

const CardShadow = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	background: hsla(219, 58%, 28%, 0.95);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;

	::-webkit-scrollbar {
		display: none;
	}
`;

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

const StyledSearch = styled.div`
	width: 90%;
	margin: 0 auto;
	padding-top: 5rem;
	position: relative;
	z-index: 10;
`;

const SearchOptions = styled.div`
	width: 90%;
	height: 5rem;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin: 0 auto;

	.vl {
		background-color: hsla(0, 0%, 100%, 0.2);
		width: 1px;
		height: 100%;
		margin: 0 2rem;
	}
`;

const SearchOption = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 100%;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	p {
		margin-top: 0.75rem;
		font-size: 1rem;
		font-weight: 300;
	}
`;

const SearchInput = styled.div`
	width: 90%;
	margin-top: 2.5rem;
	margin-bottom: 0.5rem;
	margin-left: auto;
	margin-right: auto;

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		background: hsla(208, 21%, 88%, 0.2);
		outline: 1px solid hsla(0, 0%, 100%, 0.9);
	}

	input {
		background: transparent;
		border: none;
		outline: none;
		text-align: center;
		text-transform: capitalize;
		font-size: 1rem;
		font-weight: 400;
		font-family: 'SofiaProRegular';
		margin-top: 0.125rem;
		padding: 0.25rem 0.5rem;
		width: 100%;

		&:focus {
			background: none;
		}

		&::placeholder {
			color: hsla(0, 0%, 100%, 0.9);
			font-size: 1rem;
		}
	}

	button {
		display: none;
	}

	p {
		text-align: center;
		font-size: 0.8rem;
		font-weight: 200;
		font-family: 'SofiaProExtraLight';
		padding-top: 0.75rem;
	}
`;
