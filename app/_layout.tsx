import { COLORS } from "@/constants/theme";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
				<ClerkProvider tokenCache={tokenCache}>
					<Stack screenOptions={{ headerShown: false }} />
				</ClerkProvider>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
