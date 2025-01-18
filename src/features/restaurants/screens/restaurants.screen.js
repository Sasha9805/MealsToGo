import { useContext } from "react";
import { FlatList } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import styled from "styled-components/native";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../components/search.component";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";

const RestaurantList = styled(FlatList).attrs({
	contentContainerStyle: {
		padding: 16,
	},
})``;

const Loading = styled(ActivityIndicator)`
	margin-left: -25px;
`;

const LoadingContainer = styled.View`
	position: absolute;
	top: 50%;
	left: 50%;
`;

export const RestaurantsScreen = () => {
	const { isLoading, restaurants } = useContext(RestaurantContext);

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
			<Search />
			<RestaurantList
				data={restaurants}
				renderItem={({ item }) => {
					return (
						<Spacer position="bottom" size="large">
							<RestaurantInfoCard restaurant={item} />
						</Spacer>
					);
				}}
				keyExtractor={(item) => item.name}
			/>
		</SafeArea>
	);
};
