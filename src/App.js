import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';

function App() {
	return (
		<StyledApp>
			<div className='container'>
				<Routes>
					<Route path='/' element={<Home />}>
						<Route path='/daily/:dailyId' element={<Home />} />
						<Route path='/hourly/:hourlyId' element={<Home />} />
					</Route>
				</Routes>
			</div>
		</StyledApp>
	);
}

export default App;

const StyledApp = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: linear-gradient(300deg, #e0c3fc 0%, #8ec5fc 100%);

	.container {
		max-width: 500px;
		height: 100%;
		display: flex;
		align-items: center;
	}
`;
