import { CameraView, useCameraPermissions } from "expo-camera";
import { useContext, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { useNavigation } from "@react-navigation/native";

export const CameraScreen = () => {
	const [facing, setFacing] = useState("back");
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef();
	const { user } = useContext(AuthenticationContext);
	const navigation = useNavigation();

	const snap = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			await AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
			navigation.goBack();
		}
	};

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text style={styles.message}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	return (
		<View style={styles.container}>
			<CameraView style={styles.camera} facing={facing} ref={cameraRef}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={toggleCameraFacing}
					>
						<Text style={styles.text}>Flip Camera</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={snap}>
						<Text style={styles.text}>Snap</Text>
					</TouchableOpacity>
				</View>
			</CameraView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	message: {
		textAlign: "center",
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
});
