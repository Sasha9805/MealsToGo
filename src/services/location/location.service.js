import camelize from "camelize";
import { hostGeocode } from "../../utils/env";

export const locationRequest = (searchTerm) => {
	return fetch(`${hostGeocode}?city=${searchTerm}`).then((res) => res.json());
};

export const locationTransform = ({ results }) => {
	const formattedResponse = camelize(results);
	const { geometry = {} } = formattedResponse[0];
	const { lat, lng } = geometry.location;

	return { lat, lng, viewport: geometry.viewport };
};
