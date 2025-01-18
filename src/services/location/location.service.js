import camelize from "camelize";
import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
	return new Promise((resolve, reject) => {
		const locationMock = locations[searchTerm];
		if (!locationMock) {
			reject("not found");
		}

		resolve(locationMock);
	});
};

export const locationTransform = ({ results }) => {
	const formattedResponse = camelize(results);
	const { geometry = {} } = formattedResponse[0];
	const { lat, lng } = geometry.location;

	return { lat, lng };
};
