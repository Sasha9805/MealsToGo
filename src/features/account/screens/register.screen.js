import { useContext, useState } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import {
	AccountBackground,
	AccountContainer,
	AccountCover,
	AuthButton,
	AuthInput,
	ErrorContainer,
	Title,
} from "../components/account.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { useNavigation } from "@react-navigation/native";

export const RegisterScreen = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatedPassword, setRepeatedPassword] = useState("");
	const { onRegister, isLoading, error } = useContext(AuthenticationContext);
	return (
		<AccountBackground>
			<AccountCover />
			<Title>Meals To Go</Title>
			<AccountContainer>
				<AuthInput
					label="E-mail"
					value={email}
					textContentType="emailAddress"
					keyboardType="email-address"
					autoCapitalize="none"
					onChangeText={(eMail) => setEmail(eMail)}
				/>
				<Spacer size="large">
					<AuthInput
						secureTextEntry
						textContentType="password"
						autoCapitalize="none"
						value={password}
						label="Password"
						onChangeText={(pwd) => setPassword(pwd)}
					/>
				</Spacer>
				<Spacer size="large">
					<AuthInput
						secureTextEntry
						textContentType="password"
						autoCapitalize="none"
						value={repeatedPassword}
						label="Repeat Password"
						onChangeText={(pwd) => setRepeatedPassword(pwd)}
					/>
				</Spacer>
				{error && (
					<ErrorContainer>
						<Text variant="error">{error.message}</Text>
					</ErrorContainer>
				)}
				<Spacer size="large">
					{!isLoading ? (
						<AuthButton
							icon="email"
							mode="contained"
							onPress={() =>
								onRegister(email, password, repeatedPassword)
							}
						>
							Register
						</AuthButton>
					) : (
						<ActivityIndicator
							animating={true}
							color={MD2Colors.blue300}
						/>
					)}
				</Spacer>
			</AccountContainer>
			<Spacer size="large">
				<AuthButton
					mode="contained"
					onPress={() => navigation.goBack()}
				>
					Back
				</AuthButton>
			</Spacer>
		</AccountBackground>
	);
};
