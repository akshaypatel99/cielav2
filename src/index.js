import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { GlobalStyle } from './styles/GlobalStyle';
import { WeatherProvider } from './context/WeatherContext';
import { initialState, weatherReducer } from './context/weatherReducer';

// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			staleTime: 3600000,
// 		},
// 	},
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			{/* <QueryClientProvider client={queryClient}> */}
			<WeatherProvider initialState={initialState} reducer={weatherReducer}>
				<GlobalStyle />
				<App />
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			</WeatherProvider>
			{/* </QueryClientProvider> */}
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
