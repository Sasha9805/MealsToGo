const { locations: locationsMock } = require("./geocode.mock");
// const url = require("url");

module.exports.geocodeRequest = (request, response) => {
	const { city } = request.query;
	// const { city } = url.parse(request.url, true).query;
	const locationMock = locationsMock[city.toLowerCase()];
	response.json(locationMock);
	// response.send(JSON.stringify(city));
};
