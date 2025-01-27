import camelize from "camelize";
import { hostPlaces, isMock } from "../../utils/env";

export const restaurantTransform = ({ results = [] }) => {
	const mappedResults = results.map((restaurant) => {
		return {
			...restaurant,
			isClosedTemporarily:
				restaurant.bussiness_status === "CLOSED_TEMPORARILY",
			isOpenNow:
				restaurant.opening_hours && restaurant.opening_hours.open_now,
			address: restaurant.vicinity,
		};
	});
	return camelize(mappedResults);
};

export const restaurantRequest = (location) => {
	return fetch(`${hostPlaces}?location=${location}&mock=${isMock}`).then(
		(res) => res.json()
	);
};
