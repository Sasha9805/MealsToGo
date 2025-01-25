import { useEffect } from "react";
import { Animated, useAnimatedValue } from "react-native";

export const FadeInView = ({ duration = 1500, ...props }) => {
	const fadeAnimValue = useAnimatedValue(0);
	useEffect(() => {
		Animated.timing(fadeAnimValue, {
			toValue: 1,
			duration,
			useNativeDriver: true,
		}).start();
	}, [fadeAnimValue, duration]);
	return (
		<Animated.View style={{ ...props.style, opacity: fadeAnimValue }}>
			{props.children}
		</Animated.View>
	);
};
