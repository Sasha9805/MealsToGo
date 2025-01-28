import { useState, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import styled from "styled-components/native";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { Search } from "../components/search.component";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantList } from "../components/restaurant-list.styles";
import { Text } from "../../../components/typography/text.component";

const Loading = styled(ActivityIndicator)`
	margin-left: -25px;
`;

const LoadingContainer = styled.View`
	position: absolute;
	top: 50%;
	left: 50%;
`;

export const RestaurantsScreen = () => {
	const [isToggled, setIsToggled] = useState(false);
	const navigation = useNavigation();
	const { error: locationError } = useContext(LocationContext);
	const { isLoading, error, restaurants } = useContext(RestaurantContext);
	const { favourites } = useContext(FavouritesContext);
	const hasError = !!error || !!locationError;

	return (
		<SafeArea>
			{isLoading && (
				<LoadingContainer>
					<Loading
						size="large"
						animating={true}
						color={MD2Colors.blue300}
					/>
				</LoadingContainer>
			)}
			<Search
				isFavouritesToggled={isToggled}
				onFavouritesToggle={() =>
					setIsToggled((prevState) => !prevState)
				}
			/>

			{isToggled && <FavouritesBar favourites={favourites} />}

			{hasError && (
				<Spacer position="left" size="large">
					<Text variant="error">
						Something went wrong retreiving the data
					</Text>
				</Spacer>
			)}

			{!hasError && (
				<RestaurantList
					data={restaurants}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("RestaurantDetail", {
										restaurant: item,
									})
								}
							>
								<Spacer position="bottom" size="large">
									<FadeInView>
										<RestaurantInfoCard restaurant={item} />
									</FadeInView>
								</Spacer>
							</TouchableOpacity>
						);
					}}
					keyExtractor={(item) => item.name}
				/>
			)}
		</SafeArea>
	);
};
