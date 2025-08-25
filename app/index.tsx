import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				rowGap: 12,
			}}
		>
			<Text style={{ fontSize: 20 }}>Feed Page - index.tsx</Text>
			<Link
				href="/notifications"
				style={{
					color: "#4AB94E",
					fontSize: 18,
					fontWeight: 500,
				}}
			>
				Notifications
			</Link>
			<Link
				href="/bookmarks"
				style={{
					color: "#4AB94E",
					fontSize: 18,
					fontWeight: 500,
				}}
			>
				Bookmarks
			</Link>
		</View>
	);
}
