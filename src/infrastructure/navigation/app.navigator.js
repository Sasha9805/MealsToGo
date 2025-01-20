/* eslint-disable react/display-name */
import { createStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Text } from "../../components/typography/text.component";
import { RestaurantsNavigator } from "./restaurants.navigator";

const MapScreen = () => {
	return (
		<SafeArea>
			<Text>MAP SCREEN</Text>
		</SafeArea>
	);
};

const SettingsScreen = () => {
	return (
		<SafeArea>
			<Text>SettingsScreen</Text>
		</SafeArea>
	);
};

const TAB_ICON = {
	Restaurants: "restaurant",
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
		Map: MapScreen,
		Settings: SettingsScreen,
	},
	screenOptions: createScreenOptions,
});

export const AppNavigator = createStaticNavigation(BottomTabs);
