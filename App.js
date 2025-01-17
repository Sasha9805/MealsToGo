/* eslint-disable react/display-name */
/* eslint-disable import/namespace */
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";

import {
	useFonts as useOswald,
	Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { createStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "./src/components/typography/text.component";
import { SafeArea } from "./src/components/utility/safe-area.component";

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
		Restaurants: RestaurantsScreen,
		Map: MapScreen,
		Settings: SettingsScreen,
	},
	screenOptions: createScreenOptions,
});

const Navigation = createStaticNavigation(BottomTabs);

export default function App() {
	const [oswaldLoaded, oswaldError] = useOswald({
		Oswald_400Regular,
	});

	const [latoLoaded, latoError] = useLato({
		Lato_400Regular,
	});

	if (!oswaldLoaded || !latoLoaded) {
		return null;
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<Navigation />
				{/* <RestaurantsScreen /> */}
				<ExpoStatusBar style="auto" />
			</ThemeProvider>
		</>
	);
}
