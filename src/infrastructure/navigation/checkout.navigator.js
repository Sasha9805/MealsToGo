import { createStackNavigator } from "@react-navigation/stack";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-error.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-success.screen";

const CheckoutStack = createStackNavigator();

export const CheckoutNavigator = () => {
	return (
		<CheckoutStack.Navigator screenOptions={{ headerShown: false }}>
			<CheckoutStack.Screen name="Checkout" component={CheckoutScreen} />
			<CheckoutStack.Screen
				name="CheckoutSuccess"
				component={CheckoutSuccessScreen}
			/>
			<CheckoutStack.Screen
				name="CheckoutError"
				component={CheckoutErrorScreen}
			/>
		</CheckoutStack.Navigator>
	);
};
