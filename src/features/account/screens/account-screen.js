import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
	AccountBackground,
	AccountCover,
	AccountContainer,
	AuthButton,
	Title,
	AnimationWrapper,
} from "../components/account.styles";

export const AccountScreen = () => {
	const navigation = useNavigation();
	return (
		<AccountBackground>
			<AccountCover />
			<Title>Meals To Go</Title>
			<AnimationWrapper>
				<LottieView
					autoPlay
					loop
					resizeMode="cover"
					style={{ width: "100%", height: "100%" }}
					source={require("../../../../assets/watermelon.json")}
				/>
			</AnimationWrapper>
			<AccountContainer>
				<AuthButton
					icon="lock-open-outline"
					mode="contained"
					onPress={() => {
						navigation.navigate("Login");
					}}
				>
					Login
				</AuthButton>
				<Spacer size="large">
					<AuthButton
						icon="email"
						mode="contained"
						onPress={() => {
							navigation.navigate("Register");
						}}
					>
						Register
					</AuthButton>
				</Spacer>
			</AccountContainer>
		</AccountBackground>
	);
};
