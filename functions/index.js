/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { payRequest } = require("./pay");

const { Client } = require("@googlemaps/google-maps-services-js");

const stripeClient = require("stripe");

const googleClient = new Client({});

exports.geocode = onRequest(
	{ secrets: ["GOOGLE_MAPS_KEY"] },
	(request, response) => {
		geocodeRequest(request, response, googleClient);
	}
);

exports.placesNearby = onRequest(
	{ secrets: ["GOOGLE_MAPS_KEY"] },
	(request, response) => {
		placesRequest(request, response, googleClient);
	}
);

exports.pay = onRequest({ secrets: ["STRIPE_KEY"] }, (request, response) => {
	payRequest(request, response, stripeClient);
});
