import MapView, { Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";
import { LocationContext } from "../../../services/location/location.context";
import { MapCallout } from "../components/map-callout.component";

const Map = styled(MapView)`
	flex: 1;
	width: 100%;
	height: 100%;
`;

const RestaurantMap = () => {
	const { location } = useContext(LocationContext);
	const { viewport, lat, lng } = location;
	const { restaurants = [] } = useContext(RestaurantContext);

	const navigation = useNavigation();

	const [latDelta, setLatDelta] = useState(0);

	useEffect(() => {
		const northeastLat = viewport.northeast.lat;
		const southwestLat = viewport.southwest.lat;

		setLatDelta(northeastLat - southwestLat);
	}, [location, viewport]);

	return (
		<>
			<Search />
			<Map
				region={{
					latitude: lat,
					longitude: lng,
					latitudeDelta: latDelta,
					longitudeDelta: 0.01,
				}}
			>
				{restaurants.map((restaurant) => {
					return (
						<Marker
							key={restaurant.name}
							title={restaurant.name}
							coordinate={{
								latitude: restaurant.geometry.location.lat,
								longitude: restaurant.geometry.location.lng,
							}}
						>
							<Callout
								onPress={() =>
									navigation.navigate("Restaurants", {
										screen: "RestaurantDetail",
										params: { restaurant },
									})
								}
							>
								<MapCallout restaurant={restaurant} />
							</Callout>
						</Marker>
					);
				})}
			</Map>
		</>
	);
};

export const MapScreen = () => {
	const { location } = useContext(LocationContext);

	if (!location) {
		return (
			<Map
				region={{
					latitude: 0,
					longitude: 0,
				}}
			/>
		);
	}

	return <RestaurantMap />;
};
