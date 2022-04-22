import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
	const [showSearch, setShowSearch] = useState(true);

	return (
		<SearchContext.Provider
			value={{
				showSearch,
				setShowSearch,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};
