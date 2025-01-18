import { useState, useEffect, useMemo, createContext } from "react";

import { restaurantRequest, restaurantTransform } from "./restaurants.service";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
	const [restaurants, setRestaurants] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const retreiveRestaurants = () => {
		setIsLoading(true);
		// eslint-disable-next-line no-undef
		setTimeout(() => {
			restaurantRequest()
				.then(restaurantTransform)
				.then((results) => {
					setIsLoading(false);
					setRestaurants(results);
				})
				.catch((err) => {
					setIsLoading(false);
					setError(err);
				});
		}, 4000);
	};

	useEffect(() => {
		retreiveRestaurants();
	}, []);

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
