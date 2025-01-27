import { Platform } from "react-native";

const liveHostPlaces = "https://placesnearby-jxy6fwwzra-uc.a.run.app";
const localHostPlaces =
	"http://127.0.0.1:5001/mealstogo-e7267/us-central1/placesNearby";

const liveHostGeocode = "https://geocode-jxy6fwwzra-uc.a.run.app";
const localHostGeocode =
	"http://127.0.0.1:5001/mealstogo-e7267/us-central1/geocode";

export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = false;

export const hostPlaces =
	!isDevelopment || isAndroid ? liveHostPlaces : localHostPlaces;
export const hostGeocode =
	!isDevelopment || isAndroid ? liveHostGeocode : localHostGeocode;
