import createStripe from "stripe-client";
import { hostPay } from "../../utils/env";

const stripe = createStripe(
	"pk_test_51QmIPHEwoalAdPWBcqUoWc4iZPZRuqw4UmBBwB3UMfiZPSGZhv76uwMopTUikT5VcUDnWy3jObTzelsvTetf0i8M00JByQhsc4"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
	return fetch(hostPay, {
		method: "POST",
		body: JSON.stringify({
			token,
			name,
			amount,
		}),
	}).then((res) => {
		if (res.status > 200) {
			return Promise.reject(
				"Something went wrong processing your payment"
			);
		}
		return res.json();
	});
};
