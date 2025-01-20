import MapView, { Marker, Callout } from "react-native-maps";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";
import { LocationContext } from "../../../services/location/location.context";

const Map = styled(MapView)`
	flex: 1;
	width: 100%;
	height: 100%;
`;

export const MapScreen = () => {
	const { location } = useContext(LocationContext);
	const { viewport, lat, lng } = location;
	const { restaurants = [] } = useContext(RestaurantContext);

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
					longitudeDelta: 0.02,
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
						></Marker>
					);
				})}
			</Map>
		</>
	);
};
