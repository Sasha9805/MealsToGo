import { useState, useContext } from "react";
import { ScrollView } from "react-native";
import { List, Divider } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { OrderButton } from "../components/restaurant-list.styles";
import { CartContext } from "../../../services/cart/cart.context";
import { useNavigation } from "@react-navigation/native";

export const RestaurantDetailScreen = ({ route }) => {
	const [breakfastExpanded, setBreakfastExpanded] = useState(true);
	const [lunchExpanded, setLunchExpanded] = useState(false);
	const [dinnerExpanded, setDinnerExpanded] = useState(false);
	const [drinksExpanded, setDrinksExpanded] = useState(false);

	const { restaurant } = route.params;
	const navigation = useNavigation();
	const { addToCart } = useContext(CartContext);

	return (
		<SafeArea>
			<RestaurantInfoCard restaurant={restaurant} />
			<ScrollView>
				<List.Accordion
					title="Breakfast"
					left={(props) => (
						<List.Icon {...props} icon="bread-slice" />
					)}
					expanded={breakfastExpanded}
					onPress={() => setBreakfastExpanded(!breakfastExpanded)}
				>
					<List.Item title="Eggs Benedict" />
					<Divider />

					<List.Item title="Classic Breakfast" />
				</List.Accordion>
				<Divider />

				<List.Accordion
					title="Lunch"
					left={(props) => <List.Icon {...props} icon="hamburger" />}
					expanded={lunchExpanded}
					onPress={() => setLunchExpanded(!lunchExpanded)}
				>
					<List.Item title="Burger w/ Fries" />
					<Divider />

					<List.Item title="Steak Sandwich" />
					<Divider />

					<List.Item title="Mushroom Soup" />
				</List.Accordion>
				<Divider />

				<List.Accordion
					title="Dinner"
					left={(props) => (
						<List.Icon {...props} icon="food-variant" />
					)}
					expanded={dinnerExpanded}
					onPress={() => setDinnerExpanded(!dinnerExpanded)}
				>
					<List.Item title="Spaghetti Bolognese" />
					<Divider />

					<List.Item title="Veal Cutlet with Chicket Mushroom Rotini" />
					<Divider />

					<List.Item title="Steak Frites" />
				</List.Accordion>
				<Divider />

				<List.Accordion
					title="Drinks"
					left={(props) => <List.Icon {...props} icon="cup" />}
					expanded={drinksExpanded}
					onPress={() => setDrinksExpanded(!drinksExpanded)}
				>
					<List.Item title="Coffee" />
					<Divider />

					<List.Item title="Tea" />
					<Divider />

					<List.Item title="Modelo" />
					<Divider />

					<List.Item title="Coke" />
					<Divider />

					<List.Item title="Fanta" />
				</List.Accordion>
			</ScrollView>

			<Spacer position="bottom" size="large">
				<OrderButton
					mode="contained"
					icon="cash"
					onPress={() => {
						addToCart({ item: "special", price: 1299 }, restaurant);
						navigation.navigate("Checkout");
					}}
				>
					Order Special only 12.99!
				</OrderButton>
			</Spacer>
		</SafeArea>
	);
};
