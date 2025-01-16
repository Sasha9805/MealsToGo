import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import starIcon from "../../../../assets/star";
import openIcon from "../../../../assets/open";
import { Text, Image, View } from "react-native";

const RestaurantCard = styled(Card)`
	background-color: ${(props) => props.theme.colors.bg.primary};
	border-radius: 0px;
`;

const RestaurantCardCover = styled(Card.Cover)`
	padding: ${(props) => props.theme.space[3]};
	background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Title = styled.Text`
	color: ${(props) => props.theme.colors.ui.primary};
	font-family: ${(props) => props.theme.fonts.heading};
	font-size: ${(props) => props.theme.fontSizes.body};
`;

const Address = styled.Text`
	font-family: ${(props) => props.theme.fonts.body};
	font-size: ${(props) => props.theme.fontSizes.caption};
`;

const Info = styled.View`
	padding: ${(props) => props.theme.space[3]};
`;

const Rating = styled.View`
	flex-direction: row;
	padding-top: ${(props) => props.theme.space[2]};
	padding-bottom: ${(props) => props.theme.space[2]};
`;

const Section = styled.View`
	flex-direction: row;
	align-items: center;
`;

const SectionEnd = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: flex-end;
`;

export const RestaurantInfoCard = ({ restaurant = {} }) => {
	const {
		name = "Some Restaurant",
		icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
		photos = [
			"https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
		],
		address = "100 some random street",
		isOpenNow = true,
		rating = 4,
		isClosedTemporarily = true,
	} = restaurant;

	const ratingArray = Array.from(new Array(Math.floor(rating)));

	return (
		<RestaurantCard elevation={5}>
			<RestaurantCardCover key={name} source={{ uri: photos[0] }} />
			<Info>
				<Title>{name}</Title>
				<Section>
					<Rating>
						{ratingArray.map((_, index) => (
							<SvgXml
								key={index}
								xml={starIcon}
								width={20}
								height={20}
							/>
						))}
					</Rating>
					<SectionEnd>
						{isClosedTemporarily && (
							<Text variant="label" style={{ color: "red" }}>
								CLOSED TEMPORARILY
							</Text>
						)}

						<View style={{ paddingLeft: 16 }} />

						{isOpenNow && (
							<SvgXml xml={openIcon} width={20} height={20} />
						)}

						<View style={{ paddingLeft: 15 }} />

						<Image
							style={{ width: 15, height: 15 }}
							source={{ uri: icon }}
						/>
					</SectionEnd>
				</Section>
				<Address>{address}</Address>
			</Info>
		</RestaurantCard>
	);
};
