import { useState, useContext } from "react";
import { ScrollView } from "react-native";
import { List, Divider } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CreditCardInput } from "../components/credit-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartContext } from "../../../services/cart/cart.context";
import {
	CartIconContainer,
	CartIcon,
	NameInput,
	PayButton,
	ClearButton,
	PaymentProcessing,
} from "../components/checkout.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { payRequest } from "../../../services/checkout/checkout.service";
import { useNavigation } from "@react-navigation/native";

export const CheckoutScreen = () => {
	const navigation = useNavigation();
	const { cart, restaurant, sum, clearCart } = useContext(CartContext);
	const [name, setName] = useState("");
	const [card, setCard] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const onPay = () => {
		if (!card || !card.id) {
			navigation.navigate("CheckoutError", {
				error: "Please fill in a valid credit card",
			});
			return;
		}
		setIsLoading(true);

		payRequest(card.id, sum, name)
			.then((res) => {
				setIsLoading(false);
				setCard(null);
				clearCart();
				navigation.navigate("CheckoutSuccess");
			})
			.catch((err) => {
				setIsLoading(false);
				navigation.navigate("CheckoutError", {
					error: err,
				});
			});
	};

	if (!cart.length || !restaurant) {
		return (
			<SafeArea>
				<CartIconContainer>
					<CartIcon icon="cart-off" />
					<Text>Your cart is empty!</Text>
				</CartIconContainer>
			</SafeArea>
		);
	}
	return (
		<SafeArea>
			<RestaurantInfoCard restaurant={restaurant} />

			{isLoading && <PaymentProcessing />}

			<ScrollView>
				<Spacer position="left" size="medium">
					<Spacer position="top" size="large">
						<Text>Your Order</Text>
					</Spacer>
					<List.Section>
						{cart.map(({ item, price }, i) => {
							return (
								<List.Item
									key={`item-${i}`}
									title={`${item} - ${price / 100}`}
								/>
							);
						})}
					</List.Section>
					<Text>Total: {sum / 100}</Text>
				</Spacer>

				<Spacer position="top" size="large" />
				<Divider />

				<NameInput
					label="Name"
					value={name}
					onChangeText={(t) => setName(t)}
				/>

				<Spacer position="top" size="large">
					{name.length > 0 && (
						<CreditCardInput
							name={name}
							onSuccess={setCard}
							onError={() => {
								navigation.navigate("CheckoutError", {
									error: "Something went wrong processing your credit card",
								});
							}}
						/>
					)}
				</Spacer>

				<Spacer position="top" size="xxl" />

				<PayButton
					disabled={isLoading}
					icon="cash"
					mode="contained"
					onPress={onPay}
				>
					Pay
				</PayButton>

				<Spacer icon="cart-off" position="top" size="large">
					<ClearButton
						disabled={isLoading}
						mode="contained"
						onPress={clearCart}
					>
						Clear Cart
					</ClearButton>
				</Spacer>

				<Spacer position="bottom" size="large" />
			</ScrollView>
		</SafeArea>
	);
};
