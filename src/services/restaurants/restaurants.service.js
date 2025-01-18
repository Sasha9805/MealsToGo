import { mocks, mockImages } from "./mock";
import camelize from "camelize";

export const restaurantTransform = ({ results = [] }) => {
	const mappedResults = results.map((restaurant) => {
		restaurant.photos = restaurant.photos.map((p) => {
			return mockImages[
				Math.ceil(Math.random() * (mockImages.length - 1))
			];
		});
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
	return new Promise((resolve, reject) => {
		const mock = mocks[location];

		if (!mock) {
			reject("not found");
		}

		resolve(mock);
	});
};
