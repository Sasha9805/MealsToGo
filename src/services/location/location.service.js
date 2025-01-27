import camelize from "camelize";

export const locationRequest = (searchTerm) => {
	return fetch(
		`http://127.0.0.1:5001/mealstogo-e7267/us-central1/geocode?city=${searchTerm}`
	).then((res) => res.json());
};

export const locationTransform = ({ results }) => {
	const formattedResponse = camelize(results);
	const { geometry = {} } = formattedResponse[0];
	const { lat, lng } = geometry.location;

	return { lat, lng, viewport: geometry.viewport };
};
