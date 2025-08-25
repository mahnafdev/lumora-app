import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1 }}>
				<Stack>
					{/* Options and styles of 'index' header */}
					<Stack.Screen
						name="index"
						options={{
							title: "Feed",
							headerTitleAlign: "center",
						}}
					/>
					{/* Options and styles of 'notifications' header */}
					<Stack.Screen
						name="notifications"
						options={{
							headerShown: false,
							title: "Notifications",
							headerTitleAlign: "center",
						}}
					/>
					{/* Options and styles of 'bookmarks' header */}
					<Stack.Screen
						name="bookmarks"
						options={{
							headerShown: false,
							title: "Bookmarks",
							headerTitleAlign: "center",
						}}
					/>
				</Stack>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
