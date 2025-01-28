import { useState, useEffect, createContext, useContext } from "react";

import { restaurantRequest, restaurantTransform } from "./restaurants.service";
import { LocationContext } from "../location/location.context";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
	const [restaurants, setRestaurants] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { location } = useContext(LocationContext);

	const retreiveRestaurants = (locationString) => {
		setIsLoading(true);
		setRestaurants([]);

		restaurantRequest(locationString)
			.then(restaurantTransform)
			.then((results) => {
				setError(null);
				setIsLoading(false);
				setRestaurants(results);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
				setRestaurants([]);
			});
	};

	useEffect(() => {
		if (location) {
			const locationString = `${location.lat},${location.lng}`;
			retreiveRestaurants(locationString);
		}
	}, [location]);

	return (
		<RestaurantContext.Provider
			value={{
				restaurants,
				isLoading,
				error,
			}}
		>
			{children}
		</RestaurantContext.Provider>
	);
};
