import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { RestaurantContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";

export const Navigation = () => {
	const { isAuthenticated } = useContext(AuthenticationContext);
	return isAuthenticated ? (
		<FavouritesContextProvider>
			<LocationContextProvider>
				<RestaurantContextProvider>
					<AppNavigator />
				</RestaurantContextProvider>
			</LocationContextProvider>
		</FavouritesContextProvider>
	) : (
		<NavigationContainer>
			<AccountNavigator />
		</NavigationContainer>
	);
};
