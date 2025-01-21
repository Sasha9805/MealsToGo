import styled from "styled-components/native";
import { Text } from "../typography/text.component";
import WebView from "react-native-webview";
import { Platform } from "react-native";

const CompactImage = styled.Image`
	border-radius: 10px;
	width: 120px;
	height: 120px;
`;

const CompactWebview = styled(WebView).attrs({
	containerStyle: {
		borderRadius: 10,
	},
})`
	border-radius: 10px;
	width: 120px;
	height: 120px;
`;

const Item = styled.View`
	padding: 10px;
	max-width: 120px;
	align-items: center;
`;

// const TestView = styled.View`
// 	border-radius: 10px;
// 	width: 120px;
// 	height: 120px;
// 	overflow: hidden;
// `;

// const AndroidView = ({ source }) => {
// 	return (
// 		<TestView>
// 			<WebView source={source} />
// 		</TestView>
// 	);
// };

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({ restaurant }) => {
	const Image = isAndroid ? CompactWebview : CompactImage;
	return (
		<Item>
			<Image source={{ uri: restaurant.photos[0] }} />
			<Text variant="caption" numberOfLines={3}>
				{restaurant.name}
			</Text>
		</Item>
	);
};
