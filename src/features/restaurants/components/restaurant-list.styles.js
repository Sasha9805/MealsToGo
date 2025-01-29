import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";

export const RestaurantList = styled(FlatList).attrs({
	contentContainerStyle: {
		padding: 16,
	},
})``;

export const OrderButton = styled(Button).attrs((props) => ({
	buttonColor: props.theme.colors.brand.primary,
}))`
	width: 80%;
	padding: ${(props) => props.theme.space[2]};
	align-self: center;
`;
