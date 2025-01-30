module.exports.payRequest = (request, response, stripe) => {
	const stripeClient = stripe(process.env.STRIPE_KEY);
	const { token, amount } = JSON.parse(request.body);

	stripeClient.paymentIntents
		.create({
			amount,
			currency: "USD",
			payment_method_types: ["card"],
			payment_method_data: {
				type: "card",
				card: {
					token,
				},
			},
			confirm: true,
		})
		.then((paymentIntent) => {
			response.json(paymentIntent);
		})
		.catch((e) => {
			response.status(400);
			response.send(e);
		});
};
