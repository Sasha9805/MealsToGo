/* eslint-disable react/display-name */
/* eslint-disable import/namespace */
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { PaperProvider } from "react-native-paper";

import {
	useFonts as useOswald,
	Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { Navigation } from "./src/infrastructure/navigation";

export default function App() {
	const [oswaldLoaded] = useOswald({
		Oswald_400Regular,
	});

	const [latoLoaded] = useLato({
		Lato_400Regular,
	});

	if (!oswaldLoaded || !latoLoaded) {
		return null;
	}

	return (
		<>
			<PaperProvider theme={{ roundness: 0 }}>
				<ThemeProvider theme={theme}>
					<AuthenticationContextProvider>
						<Navigation />
					</AuthenticationContextProvider>
				</ThemeProvider>
			</PaperProvider>
			<ExpoStatusBar style="auto" />
		</>
	);
}
