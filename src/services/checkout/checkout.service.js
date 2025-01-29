import createStripe from "stripe-client";

const stripe = createStripe(
	"pk_test_51QmIPHEwoalAdPWBcqUoWc4iZPZRuqw4UmBBwB3UMfiZPSGZhv76uwMopTUikT5VcUDnWy3jObTzelsvTetf0i8M00JByQhsc4"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });
