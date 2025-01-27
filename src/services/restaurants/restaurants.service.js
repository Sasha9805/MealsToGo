import camelize from "camelize";

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
	return fetch(
		`http://127.0.0.1:5001/mealstogo-e7267/us-central1/placesNearby?location=${location}`
	).then((res) => res.json());
};
