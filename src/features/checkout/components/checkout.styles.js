import styled from "styled-components/native";
import {
	ActivityIndicator,
	Avatar,
	Button,
	MD2Colors,
	TextInput,
} from "react-native-paper";

export const CartIconContainer = styled.View`
	align-items: center;
	justify-content: center;
	flex: 1;
`;
export const CartIcon = styled(Avatar.Icon).attrs({
	size: 128,
})`
	background-color: ${(props) =>
		props.bg || props.theme.colors.brand.primary};
`;

export const NameInput = styled(TextInput)`
	margin: ${(props) => props.theme.space[3]};
`;

export const PayButton = styled(Button).attrs((props) => ({
	buttonColor: props.theme.colors.brand.primary,
}))`
	align-self: center;
	width: 80%;
	padding: ${(props) => props.theme.space[2]};
`;

export const ClearButton = styled(Button).attrs((props) => ({
	buttonColor: props.theme.colors.ui.error,
}))`
	align-self: center;
	width: 80%;
	padding: ${(props) => props.theme.space[2]};
`;

export const PaymentProcessing = styled(ActivityIndicator).attrs({
	size: 128,
	animating: true,
	color: MD2Colors.blue300,
})`
	position: absolute;
	top: 50%;
	left: 35%;
	z-index: 999;
`;
