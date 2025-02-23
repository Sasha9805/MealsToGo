import { useState, useEffect, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
	const [favourites, setFavourites] = useState([]);
	const { user } = useContext(AuthenticationContext);

	const saveFavourites = async (value, uid) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
		} catch (err) {
			console.log("error storing", err);
		}
	};

	const loadFavourites = async (uid) => {
		try {
			const value = await AsyncStorage.getItem(`@favourites-${uid}`);
			if (value !== null) {
				setFavourites(JSON.parse(value));
			}
		} catch (err) {
			console.log("error loading", err);
		}
	};

	const add = (restaurant) => {
		setFavourites([...favourites, restaurant]);
	};

	const remove = (restaurant) => {
		const newFavourites = favourites.filter(
			(x) => x.placeId !== restaurant.placeId
		);
		setFavourites(newFavourites);
	};

	useEffect(() => {
		if (user && user.uid) {
			loadFavourites(user.uid);
		}
	}, [user]);

	useEffect(() => {
		if (user && user.uid && favourites.length) {
			saveFavourites(favourites, user.uid);
		}
	}, [favourites, user]);

	return (
		<FavouritesContext.Provider
			value={{
				favourites,
				addToFavourites: add,
				removeFromFavourites: remove,
			}}
		>
			{children}
		</FavouritesContext.Provider>
	);
};
