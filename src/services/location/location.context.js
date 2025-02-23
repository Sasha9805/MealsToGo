import { useState, createContext, useEffect } from "react";
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
	const [keyword, setKeyword] = useState("San Francisco");
	const [location, setLocation] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const onSearch = (searchKeyword) => {
		setKeyword(searchKeyword);
		setIsLoading(true);
	};

	useEffect(() => {
		if (!keyword.length) {
			return;
		}
		locationRequest(keyword.toLowerCase())
			.then(locationTransform)
			.then((result) => {
				setError(null);
				setIsLoading(false);
				setLocation(result);
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err);
				setLocation(null);
			});
	}, [keyword]);

	return (
		<LocationContext.Provider
			value={{
				isLoading,
				error,
				location,
				search: onSearch,
				keyword,
			}}
		>
			{children}
		</LocationContext.Provider>
	);
};
