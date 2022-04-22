import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';
import { getCityWeather, getCoordsWeather } from '../context/weatherReducer';

const Search = () => {
	const [showSearchInput, setShowSearchInput] = useState(false);
	const [city, setCity] = useState('');
	const inputRef = useRef();

	const { dispatch } = useWeather();

	const handleCoords = (e) => {
		e.preventDefault();
		getCoordsWeather()(dispatch);
	};

	const handleCity = (e) => {
		e.preventDefault();
		if (city.length > 0) {
			getCityWeather(city)(dispatch);
		} else {
			dispatch({ type: 'ERROR', error: 'Please enter a city' });
		}
	};

	useEffect(() => {
		if (showSearchInput) {
			inputRef.current.focus();
		}
	}, [showSearchInput]);

	return (
		<StyledSearch>
			<SearchOptions>
				<SearchOption
					tabIndex='1'
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
					tabIndex='2'
					onClick={() => setShowSearchInput(!showSearchInput)}
					onKeyUp={(event) => {
						if (event.key === 'Enter') {
							setShowSearchInput(!showSearchInput);
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
							tabIndex='3'
							onKeyDown={(event) => {
								if (event.key === 'Escape') {
									setShowSearchInput(!showSearchInput);
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
		</StyledSearch>
	);
};

export default Search;

const StyledSearch = styled.div`
	width: 90%;
	height: 5rem;
	margin: 3rem auto;

	.vl {
		background-color: hsla(0, 0%, 100%, 0.2);
		width: 1px;
		height: 100%;
		margin: 0 2rem;
	}
`;

const SearchOptions = styled.div`
	width: 90%;
	height: 5rem;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin: 0 auto;
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
	margin-top: 2.5rem;
	margin-bottom: 0.5rem;

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
