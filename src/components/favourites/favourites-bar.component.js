import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CompactRestaurantInfo } from "../restaurant/compact-restaurant-info.component";
import { Spacer } from "../spacer/spacer.component";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../typography/text.component";

const FavouritesWrapper = styled.View`
	padding: 10px;
`;

export const FavouritesBar = ({ favourites }) => {
	const navigation = useNavigation();

	if (!favourites.length) {
		return null;
	}

	const onNavigate = (restaurant) => {
		navigation.navigate("RestaurantDetail", {
			restaurant,
		});
	};

	return (
		<FavouritesWrapper>
			<Spacer size="large" position="left">
				<Text variant="caption">Favourites</Text>
			</Spacer>

			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{favourites.map((restaurant) => {
					const key = restaurant.name.split(" ").join("");
					return (
						<Spacer key={key} position="left" size="medium">
							<TouchableOpacity
								onPress={() => onNavigate(restaurant)}
							>
								<CompactRestaurantInfo
									restaurant={restaurant}
								/>
							</TouchableOpacity>
						</Spacer>
					);
				})}
			</ScrollView>
		</FavouritesWrapper>
	);
};
