const liveHostPlaces = "https://placesnearby-jxy6fwwzra-uc.a.run.app";
const localHostPlaces =
	"http://127.0.0.1:5001/mealstogo-e7267/us-central1/placesNearby";

const liveHostGeocode = "https://geocode-jxy6fwwzra-uc.a.run.app";
const localHostGeocode =
	"http://127.0.0.1:5001/mealstogo-e7267/us-central1/geocode";

export const isDevelopment = process.env.NODE_ENV === "development";

export const hostPlaces = isDevelopment ? localHostPlaces : liveHostPlaces;
export const hostGeocode = isDevelopment ? localHostGeocode : liveHostGeocode;
