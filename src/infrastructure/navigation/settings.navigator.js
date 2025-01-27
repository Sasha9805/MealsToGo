import {
	createStackNavigator,
	CardStyleInterpolators,
} from "@react-navigation/stack";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import { CameraScreen } from "../../features/settings/screens/camera.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = () => {
	return (
		<SettingsStack.Navigator
			screenOptions={{
				headerMode: "screen",
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<SettingsStack.Screen
				name="Settings"
				component={SettingsScreen}
				options={{ header: () => null }}
			/>
			<SettingsStack.Screen name="Camera" component={CameraScreen} />
			<SettingsStack.Screen
				name="Favourites"
				component={FavouritesScreen}
			/>
		</SettingsStack.Navigator>
	);
};
