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
			<Text style={{ fontSize: 24 }}>Feed</Text>
		</View>
	);
}
