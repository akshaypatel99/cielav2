import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';

function App() {
	return (
		<StyledApp>
			<Routes>
				<Route path='/' element={<Home />}>
					<Route path='/daily/:dailyId' element={<Home />} />
					<Route path='/hourly/:hourlyId' element={<Home />} />
				</Route>
			</Routes>
		</StyledApp>
	);
}

export default App;

const StyledApp = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	background-image: linear-gradient(300deg, #e0c3fc 0%, #8ec5fc 100%);
`;
