import styled, { useTheme } from "styled-components/native";

const sizeVariant = {
	small: 1,
	medium: 2,
	large: 3,
	xl: 4,
	xxl: 5,
};

const positionVariant = {
	top: "margin-top",
	left: "margin-left",
	right: "margin-right",
	bottom: "margin-bottom",
};

const getVariant = (position, size, theme) => {
	const sizeIndex = sizeVariant[size];
	const property = positionVariant[position];
	const value = theme.space[sizeIndex];
	return `${property}:${value}`;
};

const SpacerView = styled.View`
	${({ variant }) => variant};
`;

export const Spacer = ({ position = "top", size = "small", children }) => {
	const theme = useTheme();
	const variant = getVariant(position, size, theme);

	return <SpacerView variant={variant}>{children}</SpacerView>;
};

// export const Spacer = styled.View`
// 	${({ position = "top", size = "small", theme }) =>
// 		getVariant(position, size, theme)}
// `;
