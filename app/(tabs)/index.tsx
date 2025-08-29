import { useAuth } from "@clerk/clerk-expo";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
	const { signOut } = useAuth();
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
			<TouchableOpacity onPress={() => signOut()}>
				<Text style={{ fontSize: 18 }}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}
