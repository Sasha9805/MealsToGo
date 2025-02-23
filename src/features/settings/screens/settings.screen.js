import { useState, useContext, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { List, Avatar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../infrastructure/theme/colors";

const TransparentSafeArea = styled(SafeArea)`
	background-color: transparent;
`;

const SettingsBackground = styled.ImageBackground.attrs({
	source: require("../../../../assets/home_bg.jpg"),
})`
	position: absolute;
	height: 100%;
	width: 100%;
`;

const SettingsItem = styled(List.Item)`
	padding: ${(props) => props.theme.space[3]};
	background-color: rgba(255, 255, 255, 0.4);
`;

const AvatarContainer = styled.View`
	align-items: center;
`;

export const SettingsScreen = () => {
	const { onLogout, user } = useContext(AuthenticationContext);
	const [photo, setPhoto] = useState(null);
	const navigation = useNavigation();

	const getProfilePicture = async (currentUser) => {
		const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
		setPhoto(photoUri);
	};

	useFocusEffect(
		useCallback(() => {
			getProfilePicture(user);
		}, [user])
	);

	return (
		<SettingsBackground>
			<TransparentSafeArea>
				<AvatarContainer>
					<TouchableOpacity
						onPress={() => navigation.navigate("Camera")}
					>
						{!photo ? (
							<Avatar.Icon
								size={180}
								icon="human"
								backgroundColor={colors.brand.primary}
							/>
						) : (
							<Avatar.Image
								size={180}
								source={{ uri: photo }}
								backgroundColor={colors.brand.primary}
							/>
						)}
					</TouchableOpacity>
					<Spacer postition="top" size="large">
						<Text variant="label">{user.email}</Text>
					</Spacer>
				</AvatarContainer>

				<List.Section>
					<SettingsItem
						title="Favourites"
						description="View your favourites"
						left={(props) => (
							<List.Icon
								{...props}
								color={colors.ui.error}
								icon="heart"
							/>
						)}
						onPress={() => navigation.navigate("Favourites")}
					/>

					<Spacer />
					<SettingsItem
						title="Payment"
						left={(props) => (
							<List.Icon
								{...props}
								color={colors.ui.secondary}
								icon="cart"
							/>
						)}
						onPress={() => {}}
					/>

					<Spacer />
					<SettingsItem
						title="Past orders"
						left={(props) => (
							<List.Icon
								{...props}
								color={colors.ui.secondary}
								icon="history"
							/>
						)}
						onPress={() => {}}
					/>

					<Spacer />
					<SettingsItem
						title="Logout"
						left={(props) => (
							<List.Icon
								{...props}
								color={colors.ui.secondary}
								icon="door"
							/>
						)}
						onPress={onLogout}
					/>
				</List.Section>
			</TransparentSafeArea>
		</SettingsBackground>
	);
};
