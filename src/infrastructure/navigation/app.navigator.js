/* eslint-disable react/display-name */
import { createStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { SettingsNavigator } from "./settings.navigator";
import { CheckoutNavigator } from "./checkout.navigator";

const TAB_ICON = {
	Restaurants: "restaurant",
	Checkout: "cart",
	Map: "map",
	Settings: "settings",
};

const tabBarIcon =
	(iconName) =>
	({ size, color }) => {
		return <Ionicons name={iconName} size={size} color={color} />;
	};

const createScreenOptions = ({ route }) => {
	const iconName = TAB_ICON[route.name];
	return {
		tabBarIcon: tabBarIcon(iconName),
		tabBarActiveTintColor: "tomato",
		tabBarInactiveTintColor: "gray",
		headerShown: false,
	};
};

const BottomTabs = createBottomTabNavigator({
	screens: {
		Restaurants: RestaurantsNavigator,
		Checkout: CheckoutNavigator,
		Map: MapScreen,
		Settings: SettingsNavigator,
	},
	screenOptions: createScreenOptions,
});

export const AppNavigator = createStaticNavigation(BottomTabs);
