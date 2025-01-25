import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";

const NoFavouritesArea = styled(SafeArea)`
	align-items: center;
	justify-content: center;
`;

export const FavouritesScreen = () => {
	const { favourites } = useContext(FavouritesContext);
	const navigation = useNavigation();

	if (!favourites.length) {
		return (
			<NoFavouritesArea>
				<Text>No favourites yet</Text>
			</NoFavouritesArea>
		);
	}

	return (
		<SafeArea>
			<RestaurantList
				data={favourites}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("Restaurants", {
									screen: "RestaurantDetail",
									params: { restaurant: item },
								})
							}
						>
							<Spacer position="bottom" size="large">
								<RestaurantInfoCard restaurant={item} />
							</Spacer>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(item) => item.name}
			></RestaurantList>
		</SafeArea>
	);
};
