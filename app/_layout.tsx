import { COLORS } from "@/constants/theme";
import InitialLayout from "@/components/InitialLayout";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	// Load fonts
	const [fontsLoaded] = useFonts({
		"JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
	});
	useEffect(() => {
		// Hide splash-screen when fonts are loaded
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded]);
	// Display nothing until fonts loaded
	if (!fontsLoaded) return null;
	return (
		<ClerkAndConvexProvider>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
					<InitialLayout />
				</SafeAreaView>
			</SafeAreaProvider>
		</ClerkAndConvexProvider>
	);
}
